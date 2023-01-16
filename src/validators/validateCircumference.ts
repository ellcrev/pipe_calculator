import { LengthUnit } from "../types";

const validateCircumference = (circumference: string): string | void => {
  const c = parseFloat(circumference);
  if (isNaN(c)) {
    return;
  }
  if (c <= 0) {
    return "Value must be positive.";
  }
};

export default validateCircumference;
