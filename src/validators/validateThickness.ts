import inches2Millimeters from "../converters/in2mm";
import millimeters2Inches from "../converters/mm2in";
import { LengthUnit } from "../types";

const validateThickness = (
  thickness: string,
  thicknessUnits: LengthUnit,
  circumference: string,
  circumferenceUnits: LengthUnit,
): string | void => {
  // Try converting both thickness to a float
  let t = parseFloat(thickness);
  if (isNaN(t)) {
    return;
  }
  if (thicknessUnits === "in") {
    t = inches2Millimeters(t);
  }
  if (t < 0) {
    return "Value must be 0 or positive.";
  }
  // Try converting the circumference to a float
  let c = parseFloat(circumference);
  if (isNaN(c)) {
    return;
  }
  if (circumferenceUnits === "in") {
    c = inches2Millimeters(c);
  }
  // If outer diameter is positive, let it pass.
  const od = c / Math.PI - 2 * t;
  if (od > 0) {
    return;
  }
  // Otherwise, tell the user they need to be below max value.
  // t < (c / Math.PI) / 2
  const maximumT = c / Math.PI / 2; // in mm
  const base = "Value must be less than ";
  if (thicknessUnits === "in") {
    return base + millimeters2Inches(maximumT).toFixed(2) + " in.";
  }
  return base + maximumT.toFixed(2) + " mm.";
};

export default validateThickness;
