import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { PipeScheduleName } from "../../types";

interface ControlledSwitchProps {
  label: string;
  value: PipeScheduleName;
  onChange: (newValue: PipeScheduleName) => void;
}

const ControlledSwitch = (props: ControlledSwitchProps) => {
  return (
    <FormControl sx={{ width: "100%", my: 1 }}>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        defaultValue={"stainless-steel"}
        sx={{ color: "black" }}
        label="Pipe Material"
        onChange={(ev) => {
          props.onChange(ev.target.value as PipeScheduleName);
        }}
      >
        <MenuItem value="stainless-steel">Schedule 40 Stainless Steel</MenuItem>
        <MenuItem value="carbon-steel">Schedule 40 Carbon Steel</MenuItem>
        <MenuItem value="copper-k">Schedule 40 Copper K (Thick)</MenuItem>
        <MenuItem value="copper-l">Schedule 40 Copper L (Normal)</MenuItem>
        <MenuItem value="copper-m">Schedule 40 Copper M (Thin)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ControlledSwitch;
