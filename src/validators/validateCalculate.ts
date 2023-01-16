import { CalculationInputs } from "../types";
import validateCircumference from "./validateCircumference";
import validateTemperature from "./validateTemperature";
import validateThickness from "./validateThickness";

const validateCalculate = (props: CalculationInputs) => {
  const circumErr = validateCircumference(props.circumference.toString());
  const thicknessErr = validateThickness(
    props.thickness.toString(),
    props.thicknessUnits,
    props.circumference.toString(),
    props.circumferenceUnits,
  );
  const temperatureErr = validateTemperature(
    props.temperature.toString(),
    props.temperatureUnits,
  );
  if (
    !circumErr &&
    !thicknessErr &&
    !temperatureErr &&
    !isNaN(props.circumference) &&
    !isNaN(props.thickness) &&
    !isNaN(props.temperature)
  ) {
    return true;
  }
  return false;
};

export default validateCalculate;
