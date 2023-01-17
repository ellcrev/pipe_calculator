import { LengthUnit, SpeedUnit } from "../types";
import millimeters2Inches from "./mm2in";
import metersPerSecond2feetPerSecond from "./mps2fps";

const getNearestEstimatedAndDifference = (
  interpolatedValue: number,
  nearestValue: number,
  outputUnits: LengthUnit | SpeedUnit,
) => {
  let estimatedVal = interpolatedValue;
  let nearestVal = nearestValue;

  // If output units are not metric, convert them.
  if (outputUnits === "in") {
    estimatedVal = millimeters2Inches(estimatedVal);
    nearestVal = millimeters2Inches(nearestVal);
  } else if (outputUnits === "ft/s") {
    estimatedVal = metersPerSecond2feetPerSecond(estimatedVal);
    nearestVal = metersPerSecond2feetPerSecond(nearestVal);
  }

  // Determine the signed difference
  let diff = nearestVal - estimatedVal;
  const sign = diff < 0 ? "-" : "+";
  if (sign === "-") {
    diff *= -1;
  }
  return {
    nearest: nearestVal.toFixed(3) + " " + outputUnits,
    estimated: estimatedVal.toFixed(3) + " " + outputUnits,
    difference: sign + " " + diff.toFixed(3) + " " + outputUnits,
  };
};

export default getNearestEstimatedAndDifference;
