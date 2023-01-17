import {
  Box,
  SxProps,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

export interface UnitSwitchProps {
  units: "SI" | "IMP";
  setUnits: (newUnits: "SI" | "IMP") => void;
}

const UnitSwitch = (props: UnitSwitchProps) => {
  const selectedStyles: SxProps = {
    fontWeight: "bolder",
    backgroundColor: "#707070 !important",
    color: "white !important",
    textShadow: "0px 0px 2px black",
  };

  return (
    <Box
      data-html2canvas-ignore
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transform: "translateY(-10px)",
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: "bold",
          color: "#000000aa",
        }}
      >
        Units
      </Typography>
      <ToggleButtonGroup
        size="small"
        exclusive
        value={props.units}
        onChange={(_ev, newVal) => {
          if (newVal) {
            props.setUnits(newVal);
          }
        }}
      >
        <ToggleButton
          value="SI"
          sx={{
            fontSize: "14px",
            minWidth: "40px",
            py: 0.5,
            color: "#a0a0a0",
            ...(props.units === "SI" ? selectedStyles : {}),
          }}
        >
          SI
        </ToggleButton>
        <ToggleButton
          value="IMP"
          sx={{
            minWidth: "40px",
            fontSize: "14px",
            py: 0,
            color: "#a0a0a0",
            ...(props.units === "IMP" ? selectedStyles : {}),
          }}
        >
          IMP
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default UnitSwitch;
