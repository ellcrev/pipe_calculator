import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { CalculationOutputs } from "../calculate";
import OutputSlot from "./OutputSlot";

interface OutputProps extends CalculationOutputs {
  reset: () => void;
}

const Output = (props: OutputProps) => {
  const [useInches, setUseInches] = useState(false);
  const [useFahrenheit, setUseFahrenheit] = useState(false);
  const [useFeetPerSecond, setUseFeetPerSecond] = useState(false);
  return (
    <>
      <Divider sx={{ my: 2, fontSize: "22px", fontWeight: "bold" }}>
        Output
      </Divider>

      <OutputSlot
        units={{ useInches, useFahrenheit, useFeetPerSecond }}
        label="Outer Diameter"
        type={props.outer_diameter}
      />
      <Divider sx={{ my: 2 }} />
      <OutputSlot
        units={{ useInches, useFahrenheit, useFeetPerSecond }}
        label={"Wall Thickness"}
        type={props.wall_thickness}
      />
      <Divider sx={{ my: 2 }} />
      <OutputSlot
        units={{ useInches, useFahrenheit, useFeetPerSecond }}
        label={"Speed of Sound"}
        type={props.sound_speed}
      />
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ mr: 2, fontSize: "18px" }}>
          Toggle Units
        </Typography>
        <Button
          onClick={() => {
            setUseInches((st) => !st);
          }}
        >
          {useInches ? "mm" : "in"}
        </Button>
        <Button
          onClick={() => {
            setUseFahrenheit((st) => !st);
          }}
        >
          {useFahrenheit ? "°C" : "°F"}
        </Button>
        <Button
          onClick={() => {
            setUseFeetPerSecond((st) => !st);
          }}
        >
          {useFeetPerSecond ? "m/sec" : "ft/sec"}
        </Button>
      </Box>
      <Button
        variant="contained"
        color="error"
        sx={{ mx: "auto", display: "block", py: 1.5, mt: 4, mb: 2 }}
        fullWidth
        onClick={props.reset}
      >
        Reset Output
      </Button>
    </>
  );
};

export default Output;
