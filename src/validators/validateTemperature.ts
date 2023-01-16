import celsius2Fahrenheit from "../converters/celsius2fahrenheit";
import fahrenheit2Celsius from "../converters/fahrenheit2celsius";
import { TemperatureUnit } from "../types";

const validateWaterTemperature = (
  temperature: string,
  temperatureUnits: TemperatureUnit,
): string | void => {
  // Try converting temperature to float
  let t = parseFloat(temperature);
  if (isNaN(t)) {
    return;
  }
  if (temperatureUnits === "F") {
    t = fahrenheit2Celsius(t);
  }
  if (t < 0 || t > 100) {
    const minT =
      temperatureUnits === "F"
        ? celsius2Fahrenheit(0).toFixed(0) + " °F"
        : "0 °C";
    const maxT =
      temperatureUnits === "F"
        ? celsius2Fahrenheit(100).toFixed(0) + " °F"
        : "100 °C";
    return "Value must be between " + minT + " and " + maxT + ".";
  }
  return;
};

export default validateWaterTemperature;
