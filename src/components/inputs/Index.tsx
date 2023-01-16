import { Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import {
  CalculationInputs,
  LengthUnit,
  PipeScheduleName,
  TemperatureUnit,
} from "../../types";
import validateCircumference from "../../validators/validateCircumference";
import validateThickness from "../../validators/validateThickness";
import validateTemperature from "../../validators/validateTemperature";
import CalculateButton from "./CalculateButton";
import ControlledInput from "./ControlledInput";
import ControlledSwitch from "./ControlledSwitch";
import validateCalculate from "../../validators/validateCalculate";
import millimeters2Inches from "../../converters/mm2in";
import inches2Millimeters from "../../converters/in2mm";
import celsius2Fahrenheit from "../../converters/celsius2fahrenheit";
import fahrenheit2Celsius from "../../converters/fahrenheit2celsius";

interface InputProps {
  loading: boolean;
  onSubmit?: (data: CalculationInputs) => Promise<true>;
  clearOutput: () => void;
  circumference: string;
  setCircumference: Dispatch<SetStateAction<string>>;
  circumferenceUnits: LengthUnit;
  setCircumferenceUnits: Dispatch<SetStateAction<LengthUnit>>;
  defaultCircumferenceUnits: LengthUnit;
  thickness: string;
  setThickness: Dispatch<SetStateAction<string>>;
  thicknessUnits: LengthUnit;
  setThicknessUnits: Dispatch<SetStateAction<LengthUnit>>;
  defaultThicknessUnits: LengthUnit;
  temperature: string;
  setTemperature: Dispatch<SetStateAction<string>>;
  temperatureUnits: TemperatureUnit;
  setTemperatureUnits: Dispatch<SetStateAction<TemperatureUnit>>;
  defaultTemperatureUnits: TemperatureUnit;
  pipeSchedule: PipeScheduleName;
  setPipeSchedule: Dispatch<SetStateAction<PipeScheduleName>>;
}

const Inputs = (props: InputProps) => {
  const {
    circumference,
    setCircumference,
    circumferenceUnits,
    setCircumferenceUnits,
    defaultCircumferenceUnits,
    thickness,
    setThickness,
    thicknessUnits,
    setThicknessUnits,
    defaultThicknessUnits,
    temperature,
    setTemperature,
    temperatureUnits,
    setTemperatureUnits,
    defaultTemperatureUnits,
    pipeSchedule,
    setPipeSchedule,
  } = props;

  const inputSections = [
    {
      type: "input" as const,
      label: "Circumference (w/ Insulation)",
      acceptedUnits: ["mm", "in"] as LengthUnit[],
      value: circumference,
      onValueChange: (newValue: string) => {
        const newNum = parseFloat(newValue);
        setCircumference(isNaN(newNum) ? "" : newNum.toString());
        props.clearOutput();
      },
      units: {
        type: "length" as const,
        value: circumferenceUnits,
        defaultValue: circumferenceUnits,
        onChange: (oldUnits: LengthUnit, newUnits: LengthUnit) => {
          setCircumferenceUnits(newUnits);
          if (circumference) {
            const c = parseFloat(circumference);
            if (!isNaN(c) && newUnits === "in") {
              setCircumference(millimeters2Inches(c).toFixed(2));
            } else if (!isNaN(c) && newUnits === "mm") {
              setCircumference(inches2Millimeters(c).toFixed(2));
            }
          }
          props.clearOutput();
        },
      },
      error: validateCircumference(circumference),
    },
    {
      type: "input" as const,
      label: "Insulation Thickness",
      acceptedUnits: ["mm", "in"] as LengthUnit[],
      value: thickness,
      onValueChange: (newValue: string) => {
        const newNum = parseFloat(newValue);
        setThickness(isNaN(newNum) ? "" : newNum.toString());
        props.clearOutput();
      },
      units: {
        type: "length" as const,
        value: thicknessUnits,
        defaultValue: defaultThicknessUnits,
        onChange: (oldUnits: LengthUnit, newUnits: LengthUnit) => {
          setThicknessUnits(newUnits);
          if (thickness) {
            const t = parseFloat(thickness);
            if (!isNaN(t) && newUnits === "in") {
              setThickness(millimeters2Inches(t).toFixed(2));
            } else if (!isNaN(t) && newUnits === "mm") {
              setThickness(inches2Millimeters(t).toFixed(2));
            }
          }
          props.clearOutput();
        },
      },
      error: validateThickness(
        thickness,
        thicknessUnits,
        circumference,
        circumferenceUnits,
      ),
    },
    {
      type: "input" as const,
      label: "Water Temperature",
      acceptedUnits: ["F", "C"] as TemperatureUnit[],
      value: temperature,
      onValueChange: (newValue: string) => {
        const num = newValue === "" ? "" : Number(newValue);
        setTemperature(num.toString());
        props.clearOutput();
      },
      units: {
        type: "temperature" as const,
        value: temperatureUnits,
        defaultValue: defaultTemperatureUnits,
        onChange: (oldUnits: TemperatureUnit, newUnits: TemperatureUnit) => {
          setTemperatureUnits(newUnits);
          if (temperature) {
            const t = parseFloat(temperature);
            if (!isNaN(t) && newUnits === "F") {
              setTemperature(celsius2Fahrenheit(t).toFixed(2));
            } else if (!isNaN(t) && newUnits === "C") {
              setTemperature(fahrenheit2Celsius(t).toFixed(2));
            }
          }
          props.clearOutput();
        },
      },
      error: validateTemperature(temperature, temperatureUnits),
    },
    {
      type: "switch" as const,
      label: "Pipe Schedule",
      value: pipeSchedule,
      onChange: (newSchedule: PipeScheduleName) => {
        setPipeSchedule(newSchedule);
        props.clearOutput();
      },
    },
  ];

  const inputData = {
    circumference: parseFloat(circumference),
    circumferenceUnits,
    thickness: parseFloat(thickness),
    thicknessUnits,
    temperature: parseFloat(temperature),
    temperatureUnits,
    pipeSchedule,
  };
  const canCalculate = validateCalculate(inputData);

  return (
    <Box sx={{ mb: 2 }}>
      {inputSections.map((item) => {
        if (item.type === "input") {
          return <ControlledInput key={item.label} {...item} />;
        } else if (item.type === "switch") {
          return <ControlledSwitch key={item.label} {...item} />;
        }
      })}
      {props.onSubmit ? (
        <CalculateButton
          onSubmit={
            canCalculate
              ? () => {
                  if (props.onSubmit) {
                    props.onSubmit(inputData);
                  }
                }
              : undefined
          }
          loading={props.loading}
          inputs={inputData}
        ></CalculateButton>
      ) : null}
    </Box>
  );
};

export default Inputs;
