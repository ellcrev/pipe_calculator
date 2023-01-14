import StainlessSteelTable from "./tables/Sch40_StainlessSteel";
import CarbonSteelTable from "./tables/Sch40_CarbonSteel";
import CopperKTable from "./tables/Sch40_Copper_K";
import CopperLTable from "./tables/Sch40_Copper_L";
import CopperMTable from "./tables/Sch40_Copper_M";
import SoundSpeedWaterTable from "./tables/SoundSpeedWater";
import inches2Millimeters from "./converters/in2mm";
import centimeters2Millimeters from "./converters/cm2mm";
import fahrenheit2Celsius from "./converters/fahrenheit2celsius";

export interface PipeTableInterface {
  type: "pipe";
  title: string;
  labels: [string, string];
  values: {
    id: string;
    outer_diameter: number; // Always in mm
    wall_thickness: number; // Always in mm
  }[];
}

export interface SoundSpeedWaterTableInterface {
  type: "speed";
  title: string;
  labels: [string, string];
  values: {
    id: string;
    temperature: number; // Always in celsius
    speed_of_sound: number; // Always in m/s
  }[];
}

export interface CalculationInputs {
  circumference: number;
  circumference_units: "cm" | "mm" | "in";
  insulation_thickness: number;
  insulation_thickness_units: "cm" | "mm" | "in";
  temperature: number;
  temperature_units: "C" | "F";
  pipe_material:
    | "stainless-steel"
    | "carbon-steel"
    | "copper-k"
    | "copper-l"
    | "copper-m";
}

export interface CalculationOutputs {
  outer_diameter: number; // Always in mm
  wall_thickness: {
    table: PipeTableInterface;
    nearest_index: number;
    interpolated_value: number; // Always in mm
  };
  sound_speed: {
    table: SoundSpeedWaterTableInterface;
    nearest_index: number;
    interpolated_value: number; // Always in m/s
  };
}

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
  // ======================= STEP 0 ======================
  /**
   * Convert all inputData to metric.
   */
  if (inputData.circumference_units === "in") {
    inputData.circumference = inches2Millimeters(inputData.circumference);
  } else if (inputData.circumference_units === "cm") {
    inputData.circumference = centimeters2Millimeters(inputData.circumference);
  }
  if (inputData.insulation_thickness_units === "in") {
    inputData.insulation_thickness = inches2Millimeters(
      inputData.insulation_thickness,
    );
  } else if (inputData.insulation_thickness_units === "cm") {
    inputData.insulation_thickness = centimeters2Millimeters(
      inputData.insulation_thickness,
    );
  }
  if (inputData.temperature_units === "F") {
    inputData.temperature = fahrenheit2Celsius(inputData.temperature);
  }

  // ========================== STEP 1 (Outer Diameter) ======================
  /**
   * Calculate the outer diameter from the circumference and insulation thickness
   * using the following formula: (C / pi) - (2 * t) = OD
   *
   * if (C / pi) - (2 * t) < 0 : throw error
   */
  const outer_diameter =
    inputData.circumference / Math.PI - 2 * inputData.insulation_thickness;
  // ======================= STEP 2 (Pipe Material Table) ======================
  /**
   * Set the SCH pipe table based on the material specified.
   * Each table has entries for outer_diameters & corresponding wall thickness.
   */
  let table: PipeTableInterface;
  if (inputData.pipe_material === "stainless-steel") {
    table = {
      type: "pipe",
      title: StainlessSteelTable.title,
      labels: StainlessSteelTable.labels as [string, string],
      values: StainlessSteelTable.values.map((val) => ({
        ...val,
        id: crypto.randomUUID(),
      })),
    };
  } else if (inputData.pipe_material === "carbon-steel") {
    table = {
      title: CarbonSteelTable.title,
      type: "pipe",
      labels: CarbonSteelTable.labels as [string, string],
      values: CarbonSteelTable.values.map((val) => ({
        ...val,
        id: crypto.randomUUID(),
      })),
    };
  } else if (inputData.pipe_material === "copper-k") {
    table = {
      type: "pipe",
      title: CopperKTable.title,
      labels: CopperKTable.labels as [string, string],
      values: CopperKTable.values.map((val) => ({
        ...val,
        id: crypto.randomUUID(),
      })),
    };
  } else if (inputData.pipe_material === "copper-l") {
    table = {
      type: "pipe",
      title: CopperLTable.title,
      labels: CopperLTable.labels as [string, string],
      values: CopperLTable.values.map((val) => ({
        ...val,
        id: crypto.randomUUID(),
      })),
    };
  } else if (inputData.pipe_material === "copper-m") {
    table = {
      type: "pipe",
      title: CopperMTable.title,
      labels: CopperMTable.labels as [string, string],
      values: CopperMTable.values.map((val) => ({
        ...val,
        id: crypto.randomUUID(),
      })),
    };
  } else {
    throw Error(
      "No table found for pipe-material " + inputData.pipe_material + ".",
    );
  }

  // ======================= STEP 3 (Wall Thickness) ======================
  /**
   *  Part 1: Iterate over table until nearestPipeIndex
   *  has an outer diameter that is greater than or equal
   *  to the calculated outer_diameter.
   */
  let nearestODIndex: number = table.values.length - 1;
  for (let i = 0; i < table.values.length; i++) {
    const entry = table.values[i];
    if (entry.outer_diameter >= outer_diameter) {
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
    table.values[nearestODIndex].outer_diameter - outer_diameter,
  );
  const previousODDiff = Math.abs(
    nearestODIndex - 1 >= 0
      ? table.values[nearestODIndex - 1].outer_diameter - outer_diameter
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
    (table.values[nearestODIndex].wall_thickness * outer_diameter) /
    table.values[nearestODIndex].outer_diameter;

  // ======================= STEP 4 (Speed of Sound in Water) ======================
  /**
   *  Part 1: Iterate over table until nearestTemperatureIndex
   *  has a temperature that is greater than or equal
   *  to the given input temperature.
   */
  let nearestTemperatureIndex = SoundSpeedWaterTable.values.length - 1;
  for (let i = 0; i < SoundSpeedWaterTable.values.length; i++) {
    const entry = SoundSpeedWaterTable.values[i];
    if (entry.temperature >= inputData.temperature) {
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
    SoundSpeedWaterTable.values[nearestTemperatureIndex].temperature -
      inputData.temperature,
  );
  const previousTemperatureDiff = Math.abs(
    nearestTemperatureIndex - 1 >= 0
      ? SoundSpeedWaterTable.values[nearestTemperatureIndex - 1].temperature -
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
  const interpolatedSpeedOfSound =
    (SoundSpeedWaterTable.values[nearestTemperatureIndex].speed_of_sound *
      inputData.temperature) /
    SoundSpeedWaterTable.values[nearestTemperatureIndex].temperature;

  // ======================= STEP 5 (Return Output) ======================
  return {
    outer_diameter,
    wall_thickness: {
      table: table,
      nearest_index: nearestODIndex,
      interpolated_value: interpolatedWallThickness,
    },
    sound_speed: {
      table: {
        type: "speed",
        title: SoundSpeedWaterTable.title,
        labels: SoundSpeedWaterTable.labels as [string, string],
        values: SoundSpeedWaterTable.values.map((val) => ({
          ...val,
          id: crypto.randomUUID(),
        })),
      },
      nearest_index: nearestTemperatureIndex,
      interpolated_value: interpolatedSpeedOfSound,
    },
  };
};
