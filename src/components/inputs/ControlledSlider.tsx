import { Box, Slider } from "@mui/material";
import { TemperatureUnit } from "../../types";
import ControlledInput from "./ControlledInput";

interface ControlledSliderProps {
  label: string;
  acceptedUnits: TemperatureUnit[];
  sliderProps: {
    marks: { value: number; label: string }[];
  };
  value: string;
  onValueChange: (val: string) => void;
  units: {
    type: "temperature";
    defaultValue: TemperatureUnit;
    value: TemperatureUnit;
    onChange: (oldUnits: TemperatureUnit, newUnits: TemperatureUnit) => void;
  };
  error: string | void;
}

const ControlledSlider = (props: ControlledSliderProps) => {
  return (
    <Box
      sx={{
        my: 2,
      }}
    >
      <ControlledInput
        label={props.label}
        acceptedUnits={props.acceptedUnits}
        value={props.value}
        onValueChange={props.onValueChange}
        units={props.units}
        error={props.error}
      />
      <Box
        sx={{
          px: 2,
          "@media screen and (min-width: 400px)": {
            px: 0,
          },
          mr: 1,
        }}
      >
        <Slider
          sx={{ mt: 1 }}
          min={props.units.value === "C" ? 0 : 32}
          max={props.units.value === "C" ? 100 : 212}
          marks={props.sliderProps.marks}
          valueLabelDisplay="auto"
          value={isNaN(parseFloat(props.value)) ? 32 : parseFloat(props.value)}
          onChange={(_ev, newVal) => {
            props.onValueChange(newVal.toString());
          }}
        />
      </Box>
    </Box>
  );
};

export default ControlledSlider;
