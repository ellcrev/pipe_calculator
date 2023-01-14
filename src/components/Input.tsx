import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CalculationInputs } from "../calculate";
import celsius2Fahrenheit from "../converters/celsius2fahrenheit";
import centimeters2Millimeters from "../converters/cm2mm";
import fahrenheit2Celsius from "../converters/fahrenheit2celsius";
import inches2Millimeters from "../converters/in2mm";
import millimeters2Centimeters from "../converters/mm2cm";
import millimeters2Inches from "../converters/mm2in";

interface InputsInterface {
  outputSet: boolean;
  onChange: () => void;
  onSubmit: (data: CalculationInputs) => Promise<true>;
  loading: boolean;
}

/**
 * When this outputs:
 * string => Failed Test | Display Error String
 * false => Passed Test
 */
const testThickness = (
  c: number | null,
  c_units: "mm" | "cm" | "in",
  t: number | null,
  t_units: "mm" | "cm" | "in",
) => {
  if (c === null || t === null) {
    return false;
  }
  if (c < 0) {
    return false;
  }
  if (c_units === "cm") {
    c = centimeters2Millimeters(c);
  } else if (c_units === "in") {
    c = inches2Millimeters(c);
  }
  if (t_units === "cm") {
    t = centimeters2Millimeters(t);
  } else if (t_units === "in") {
    t = inches2Millimeters(t);
  }
  if (t < 0) {
    return "Value must be positive.";
  }
  if (c / Math.PI - 2 * t > 0) {
    return false;
  }

  // t < (c / Math.PI) / 2
  const minimumT = c / Math.PI / 2; // in mm
  const base = "Value must be less than ";
  if (t_units === "cm") {
    return base + millimeters2Centimeters(minimumT).toFixed(2) + " cm.";
  } else if (t_units === "in") {
    return base + millimeters2Inches(minimumT).toFixed(2) + " in.";
  }
  return base + minimumT.toFixed(2) + " mm.";
};

/**
 * When this outputs:
 * string => Failed Test | Display Error String
 * false => Passed Test
 */
const testTemperature = (t: number | string, t_units: "F" | "C") => {
  if (typeof t === "string") {
    return false;
  } else if (t_units === "F") {
    t = fahrenheit2Celsius(t);
  }
  if (t < 0 || t > 100) {
    const minT =
      t_units === "F" ? celsius2Fahrenheit(0).toFixed(0) + " °F" : "0 °C";
    const maxT =
      t_units === "F" ? celsius2Fahrenheit(100).toFixed(0) + " °F" : "100 °C";
    return "Value must be between " + minT + " and " + maxT + ".";
  }
  return false;
};

const Inputs = (props: InputsInterface) => {
  const [circum, setCircum] = useState<number | undefined>();
  const [circumUnits, setCircumUnits] = useState<"in" | "cm" | "mm">("in");
  const [thickness, setThickness] = useState<number | undefined>();
  const [thicknessUnits, setThicknessUnits] = useState<"in" | "cm" | "mm">(
    "in",
  );
  const [temp, setTemp] = useState<number | string>("");
  const [tempUnits, setTempUnits] = useState<"F" | "C">("F");
  const [pipe, setPipe] = useState<
    "stainless-steel" | "carbon-steel" | "copper-k" | "copper-l" | "copper-m"
  >("stainless-steel");

  const celciusMarks = [
    {
      value: 0,
      label: "0°C",
    },
    {
      value: 50,
      label: "50°C",
    },
    {
      value: 100,
      label: "100°C",
    },
  ];
  const fahrenheitMarks = [
    {
      value: 32,
      label: "32°F",
    },
    {
      value: 122,
      label: "122°F",
    },
    {
      value: 212,
      label: "212°F",
    },
  ];

  // Errors ---------------
  const circumferenceError =
    typeof circum === "number" && circum <= 0
      ? "Value must be positive."
      : false;

  const thicknessError = testThickness(
    circum ?? null,
    circumUnits,
    thickness ?? null,
    thicknessUnits,
  );

  const temperatureError = testTemperature(temp, tempUnits);

  const completedForm =
    typeof circum === "number" &&
    typeof thickness === "number" &&
    typeof temp === "number" &&
    circumferenceError === false &&
    thicknessError === false &&
    temperatureError === false;

  return (
    <Box>
      {/* Circumference */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mx: "auto",
          my: 2,
        }}
      >
        <TextField
          onChange={(ev) => {
            const num = parseFloat(ev.target.value);
            if (isNaN(num)) {
              setCircum(undefined);
            } else {
              setCircum(num);
            }
            props.onChange();
          }}
          error={circumferenceError !== false}
          helperText={
            circumferenceError === false ? undefined : circumferenceError
          }
          placeholder="24"
          sx={{ flexGrow: 1, mr: 2 }}
          type="number"
          label="Circumference (w/ Insulation)"
        />
        <FormControl sx={{ minWidth: "75px" }}>
          <InputLabel id="demo-simple-select-label">Units</InputLabel>
          <Select
            defaultValue={"in"}
            label="Units"
            onChange={(ev) => {
              setCircumUnits(ev.target.value as "in" | "mm" | "cm");
              props.onChange();
            }}
          >
            <MenuItem value="mm">mm</MenuItem>
            <MenuItem value="cm">cm</MenuItem>
            <MenuItem value="in">in</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Insulation Thickness */}
      <Box
        sx={{
          my: 4,
          display: "flex",
          alignItems: "flex-start",
          mx: "auto",
        }}
      >
        <TextField
          onChange={(ev) => {
            const t = parseFloat(ev.target.value);
            if (isNaN(t)) {
              setThickness(undefined);
            } else {
              setThickness(t);
            }
            props.onChange();
          }}
          error={thicknessError !== false}
          helperText={thicknessError === false ? undefined : thicknessError}
          placeholder="24"
          sx={{ flexGrow: 1, mr: 2 }}
          type="number"
          label="Insulation Thickness"
        />
        <FormControl sx={{ minWidth: "75px" }}>
          <InputLabel id="demo-simple-select-label">Units</InputLabel>
          <Select
            defaultValue={"in"}
            sx={{ flexShrink: 0, color: "black" }}
            label="Units"
            onChange={(ev) => {
              setThicknessUnits(ev.target.value as "mm" | "cm" | "in");
              props.onChange();
            }}
          >
            <MenuItem value="mm">mm</MenuItem>
            <MenuItem value="cm">cm</MenuItem>
            <MenuItem value="in">in</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Water Temperature */}
      <Box
        sx={{
          my: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <TextField
            value={temp}
            onChange={(ev) => {
              const num = ev.target.value === "" ? "" : Number(ev.target.value);
              setTemp(num);
              props.onChange();
            }}
            placeholder="24"
            sx={{ flexGrow: 1, mr: 2 }}
            type="number"
            label="Water Temperature"
            error={temperatureError !== false}
            helperText={
              temperatureError === false ? undefined : temperatureError
            }
          />
          <FormControl sx={{ minWidth: "75px" }}>
            <InputLabel id="demo-simple-select-label">Units</InputLabel>
            <Select
              defaultValue={"F"}
              sx={{ flexShrink: 0, color: "black" }}
              label="Units"
              onChange={(ev) => {
                if (
                  ev.target.value === "F" &&
                  tempUnits === "C" &&
                  typeof temp === "number"
                ) {
                  setTemp(Math.round((temp * 9) / 5 + 32));
                } else if (
                  ev.target.value === "C" &&
                  tempUnits === "F" &&
                  typeof temp === "number"
                ) {
                  setTemp(Math.round(((temp - 32) * 5) / 9));
                }
                setTempUnits(ev.target.value as "F" | "C");
                props.onChange();
              }}
            >
              <MenuItem value="F">F°</MenuItem>
              <MenuItem value="C">C°</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
            min={tempUnits === "C" ? 0 : 32}
            max={tempUnits === "C" ? 100 : 212}
            marks={tempUnits === "C" ? celciusMarks : fahrenheitMarks}
            valueLabelDisplay="auto"
            value={typeof temp === "number" ? temp : 0}
            onChange={(ev, newVal) => {
              setTemp(newVal as number);
              props.onChange();
            }}
          />
        </Box>
      </Box>
      {/* Pipe Schedule */}
      <FormControl sx={{ width: "100%", my: 2 }}>
        <InputLabel id="demo-simple-select-label">Pipe Schedule</InputLabel>
        <Select
          defaultValue={"stainless-steel"}
          sx={{ color: "black" }}
          label="Pipe Material"
          onChange={(ev) => {
            setPipe(
              ev.target.value as
                | "stainless-steel"
                | "carbon-steel"
                | "copper-k"
                | "copper-l"
                | "copper-m",
            );
            props.onChange();
          }}
        >
          <MenuItem value="stainless-steel">
            Schedule 40 Stainless Steel
          </MenuItem>
          <MenuItem value="carbon-steel">Schedule 40 Carbon Steel</MenuItem>
          <MenuItem value="copper-k">Schedule 40 Copper K (Thick)</MenuItem>
          <MenuItem value="copper-l">Schedule 40 Copper L (Normal)</MenuItem>
          <MenuItem value="copper-m">Schedule 40 Copper M (Thin)</MenuItem>
        </Select>
      </FormControl>
      {!props.outputSet ? (
        <Button
          variant="contained"
          sx={{ my: 2, py: 1.5, display: "flex", position: "relative" }}
          fullWidth
          onClick={() =>
            props.onSubmit({
              circumference: circum ?? 10,
              circumference_units: circumUnits,
              insulation_thickness: thickness ?? 10,
              insulation_thickness_units: thicknessUnits,
              temperature: typeof temp === "number" ? temp : 32,
              temperature_units: tempUnits,
              pipe_material: pipe,
            })
          }
          disabled={!completedForm || props.loading}
        >
          Calculate
          {props.loading ? (
            <CircularProgress
              sx={{ position: "absolute", right: "18px" }}
              size={"24px"}
            />
          ) : null}
        </Button>
      ) : null}
    </Box>
  );
};

export default Inputs;
