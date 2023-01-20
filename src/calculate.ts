import inches2Millimeters from "./converters/in2mm";
import fahrenheit2Celsius from "./converters/fahrenheit2celsius";
import {
  CalculationInputs,
  CalculationOutputs,
  SoundSpeedWaterTableInterface,
} from "./types";
import tableLookup from "./tables/functions/tableLookup";

/**
 * This function takes in given input data, calculates the output, and returns it.
 *
 * @param {CalculationInputs} inputData - The input parameters for the calculation
 *   (1) - Circumference w/ Insulation & Units
 *   (2) - Insulation Thickness & Units
 *   (3) - Temperature of Water & Units
 *   (4) - Pipe Material Table Name
 * @returns {CalculationOutputs} - The output data from the calculation
 *   (1) - Outer Diameter (m/s)
 *   (2) - Wall Thickness Object
 *         (2a) - The pipe material table
 *         (2b) - The nearest outer diameter index on the corresponding pipe table
 *         (2c) - The interpolated wall thickness (mm)
 *   (3) - Speed of Sound Object
 *         (3a) - The speed of sound vs temperature table
 *         (3b) - The nearest temperature index on the corresponding speed of sound table
 *         (3c) - The interpolated speed of sound (m/s)
 */
export const calculate = (inputData: CalculationInputs): CalculationOutputs => {
  const defaultUnits: CalculationOutputs["defaultUnits"] = {
    length: "in",
    speed: "ft/s",
    temperature: "F",
  };
  // ======================= STEP 0 ======================
  /**
   * Convert all inputData to metric & set the default units based on input.
   */
  if (inputData.circumferenceUnits === "in") {
    inputData.circumference = inches2Millimeters(inputData.circumference);
    defaultUnits.length = "in";
    defaultUnits.speed = "ft/s";
  }
  if (inputData.thicknessUnits === "in") {
    inputData.thickness = inches2Millimeters(inputData.thickness);
    defaultUnits.length = "in";
    defaultUnits.speed = "ft/s";
  }
  if (inputData.temperatureUnits === "F") {
    inputData.temperature = fahrenheit2Celsius(inputData.temperature);
    defaultUnits.temperature = "F";
  } else {
    defaultUnits.temperature = "C";
  }

  // ========================== STEP 1 (Outer Diameter) ======================
  /**
   * Calculate the outer diameter from the circumference and insulation thickness
   * using the following formula: (C / pi) - (2 * t) = OD
   *
   * if (C / pi) - (2 * t) < 0 : throw error
   */
  const outerDiameterInMM =
    inputData.circumference / Math.PI - 2 * inputData.thickness;

  // ======================= STEP 2 (Pipe Material Table) ======================
  /**
   * Set the SCH pipe table based on the material specified.
   */
  const table = tableLookup(inputData.pipeSchedule);
  if (table.type !== "pipe") {
    throw Error("Error retrieving table.");
  }

  // ======================= STEP 3 (Wall Thickness) ======================
  /**
   *  Part 1: Iterate over table until nearestPipeIndex
   *  has an outer diameter that is greater than or equal
   *  to the calculated outerDiameterInMM.
   */
  let nearestODIndex: number = table.values.length - 1;
  for (let i = 0; i < table.values.length; i++) {
    const entry = table.values[i];
    if (entry.outerDiameterInMM >= outerDiameterInMM) {
      nearestODIndex = i;
      break;
    }
  }

  /**
   * Part 2: Determine if the entry that comes before the current
   * pipe index's corresponding entry's outer diameter is closer to
   * the calculated outer diameter.
   */
  const greaterODDiff = Math.abs(
    table.values[nearestODIndex].outerDiameterInMM - outerDiameterInMM,
  );
  const previousODDiff = Math.abs(
    nearestODIndex - 1 >= 0
      ? table.values[nearestODIndex - 1].outerDiameterInMM - outerDiameterInMM
      : Infinity,
  );
  if (
    !isNaN(greaterODDiff) &&
    !isNaN(previousODDiff) &&
    previousODDiff < greaterODDiff
  ) {
    nearestODIndex--;
  }

  /**
   * Part 3: Linearly interpolate the wall thickness.
   */
  const interpolatedWallThickness =
    (table.values[nearestODIndex].wallThicknessInMM * outerDiameterInMM) /
    table.values[nearestODIndex].outerDiameterInMM;

  // ======================= STEP 4 (Speed of Sound in Water) ======================
  const speedTable = tableLookup("speed") as SoundSpeedWaterTableInterface;
  /**
   *  Part 1: Iterate over table until nearestTemperatureIndex
   *  has a temperature that is greater than or equal
   *  to the given input temperature.
   */
  let nearestTemperatureIndex = speedTable.values.length - 1;
  for (let i = 0; i < speedTable.values.length; i++) {
    const entry = speedTable.values[i];
    if (entry.temperatureInCelsius >= inputData.temperature) {
      nearestTemperatureIndex = i;
      break;
    }
  }

  /**
   * Part 2: Determine if the entry that comes before the current
   * water index's corresponding entry's temperature is closer to
   * the given input temperature.
   */
  const greaterTemperatureDiff = Math.abs(
    speedTable.values[nearestTemperatureIndex].temperatureInCelsius -
      inputData.temperature,
  );
  const previousTemperatureDiff = Math.abs(
    nearestTemperatureIndex - 1 >= 0
      ? speedTable.values[nearestTemperatureIndex - 1].temperatureInCelsius -
          inputData.temperature
      : Infinity,
  );
  if (
    !isNaN(greaterTemperatureDiff) &&
    !isNaN(previousTemperatureDiff) &&
    previousTemperatureDiff < greaterTemperatureDiff
  ) {
    nearestTemperatureIndex--;
  }

  /**
   * Part 3: Linearly interpolate the speed of sound.
   */
  const linearlyInterpolate = (temp: number) => {
    // Step 1: Find the closest index to the given temperature
    const closestIndex = nearestTemperatureIndex;
    if(temp < speedTable.values[0].temperatureInCelsius) {
      // give prediction for temp below the smallest temperature
      return speedTable.values[0].speedOfSoundInMetersPerSecond * temp / speedTable.values[0].temperatureInCelsius;
    }
    else if(temp > speedTable.values[speedTable.values.length - 1].temperatureInCelsius) {
      // give prediction for temp above the greatest temperature
      return speedTable.values[speedTable.values.length - 1].speedOfSoundInMetersPerSecond * temp / speedTable.values[speedTable.values.length - 1].temperatureInCelsius;
    }
    else if(speedTable.values[closestIndex + 1]){
      // Step 2: Linearly interpolate the the speed of sound from the given input temperature.
      const interpolated = (speedTable.values[closestIndex + 1].speedOfSoundInMetersPerSecond - speedTable.values[closestIndex].speedOfSoundInMetersPerSecond) * (temp - speedTable.values[closestIndex].temperatureInCelsius) / (speedTable.values[closestIndex + 1].temperatureInCelsius - speedTable.values[closestIndex].temperatureInCelsius) + speedTable.values[closestIndex].speedOfSoundInMetersPerSecond;
      return interpolated;
    }
    else{
      return speedTable.values[closestIndex].speedOfSoundInMetersPerSecond;
    }
  }
  const interpolatedSpeedOfSound = linearlyInterpolate(inputData.temperature);

  // ======================= STEP 5 (Return Output) ======================
  return {
    outerDiameterMillimeters: outerDiameterInMM,
    wallThickness: {
      table: table,
      nearestIndex: nearestODIndex,
      interpolatedValueMillimeters: interpolatedWallThickness,
    },
    soundSpeed: {
      table: {
        type: "speed",
        title: speedTable.title,
        labels: speedTable.labels as [string, string],
        values: speedTable.values.map((val) => ({
          temperatureInCelsius: val.temperatureInCelsius,
          speedOfSoundInMetersPerSecond: val.speedOfSoundInMetersPerSecond,
          id: crypto.randomUUID(),
        })),
      },
      nearestIndex: nearestTemperatureIndex,
      interpolatedValueMetersPerSecond: interpolatedSpeedOfSound,
    },
    defaultUnits,
  };
};
