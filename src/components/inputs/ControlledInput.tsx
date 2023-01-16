import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { TemperatureUnit, LengthUnit } from "../../types";

interface ControlledInputProps {
  label: string;
  acceptedUnits: (LengthUnit | TemperatureUnit)[];
  value: string;
  onValueChange: (val: string) => void;
  units:
    | {
        type: "temperature";
        value: TemperatureUnit;
        defaultValue: TemperatureUnit;
        onChange: (oldUnit: TemperatureUnit, newUnit: TemperatureUnit) => void;
      }
    | {
        type: "length";
        value: LengthUnit;
        defaultValue: LengthUnit;
        onChange: (oldUnit: LengthUnit, newUnit: LengthUnit) => void;
      };
  error: string | void;
}

const ControlledInput = (props: ControlledInputProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        mx: "auto",
        my: 3,
      }}
    >
      <TextField
        onChange={(ev) => {
          const num = parseFloat(ev.target.value);
          if (isNaN(num)) {
            props.onValueChange("");
          } else {
            props.onValueChange(num.toString());
          }
        }}
        {...(props.units.type === "temperature" || props.units.type === "length"
          ? {
              value: isNaN(parseFloat(props.value))
                ? ""
                : parseFloat(props.value),
            }
          : {})}
        error={props.error ? true : false}
        helperText={props.error ? props.error : undefined}
        placeholder={props.value}
        sx={{ flexGrow: 1, mr: 2 }}
        type="number"
        label={props.label}
      />
      <FormControl sx={{ minWidth: "75px" }}>
        <InputLabel id="demo-simple-select-label">Units</InputLabel>
        <Select
          value={props.units.value}
          label="Units"
          onChange={(ev) => {
            if (props.units.type === "temperature") {
              props.units.onChange(
                props.units.value,
                ev.target.value as TemperatureUnit,
              );
            } else if (props.units.type === "length") {
              props.units.onChange(
                props.units.value,
                ev.target.value as LengthUnit,
              );
            }
          }}
        >
          {props.acceptedUnits.map((acceptedUnit) => (
            <MenuItem value={acceptedUnit} key={acceptedUnit}>
              {props.units.type === "temperature"
                ? `°${acceptedUnit}`
                : acceptedUnit}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ControlledInput;
