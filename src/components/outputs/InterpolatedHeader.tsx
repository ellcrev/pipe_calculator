import { Help } from "@mui/icons-material";
import { Box, ClickAwayListener, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import millimeters2Inches from "../../converters/mm2in";
import metersPerSecond2feetPerSecond from "../../converters/mps2fps";
import UnitSwitch from "./UnitSwitch";

interface InterpolatedHeaderProps {
  label: string;
  interpolatedValue: number; // Always metric
  nearestValue: number; // Always metric
  outputUnits: "mm" | "in" | "m/s" | "ft/s"; // Desired ouput units
  onUnitChange: (newSystem: "SI" | "IMP") => void;
}

const InterpolatedHeader = (props: InterpolatedHeaderProps) => {
  const [openTooltip, setOpenTooltip] = useState(false);
  let estimatedVal = props.interpolatedValue;
  let nearestVal = props.nearestValue;

  // If output units are not metric, convert them.
  if (props.outputUnits === "in") {
    estimatedVal = millimeters2Inches(estimatedVal);
    nearestVal = millimeters2Inches(nearestVal);
  } else if (props.outputUnits === "ft/s") {
    estimatedVal = metersPerSecond2feetPerSecond(estimatedVal);
    nearestVal = metersPerSecond2feetPerSecond(nearestVal);
  }

  // Determine the signed difference
  let diff = nearestVal - estimatedVal;
  const sign = diff < 0 ? "-" : "+";
  if (sign === "-") {
    diff *= -1;
  }

  return (
    <Box>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontSize={"20px"} fontWeight={"bold"}>
          {props.label}
        </Typography>

        <UnitSwitch
          units={
            props.outputUnits === "ft/s" || props.outputUnits === "in"
              ? "IMP"
              : "SI"
          }
          setUnits={props.onUnitChange}
        />
      </Box>
      <Box>
        {/*  ============== Nearest Table Value ============ */}
        <Typography
          variant="subtitle2"
          sx={{
            justifyContent: "space-between",
            fontSize: "16px",
            my: 2,
            pl: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            Nearest Table Value{" "}
          </span>
          <Typography
            sx={{
              border: "1px solid #00000044",
              backgroundColor: "lightgreen",
              fontWeight: "bold",
              ml: 2,
              p: 0.5,
              px: 2,
              borderRadius: "4px",
              fontSize: "16px",
              minWidth: "100px",
              textAlign: "center",
            }}
          >
            {nearestVal.toFixed(3)} {props.outputUnits}
          </Typography>
        </Typography>
        {/*  ============== ESTIMATED VALUE ============ */}

        <Typography
          variant="subtitle2"
          sx={{
            fontSize: "16px",
            my: 2,
            pl: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ClickAwayListener
            onClickAway={() => {
              setOpenTooltip(false);
            }}
          >
            <Tooltip
              open={openTooltip}
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => {
                setOpenTooltip(false);
              }}
              arrow
              disableFocusListener
              disableHoverListener
              componentsProps={{
                tooltip: {
                  sx: {
                    p: 2,
                    bgcolor: "#202528fa",
                  },
                },
                arrow: {
                  sx: {
                    "&:before": {
                      backgroundColor: "#202528fa",
                      border: "none",
                    },
                  },
                },
              }}
              title={
                <Typography>
                  Estimates the {props.label.toLowerCase()} by interpolating the
                  nearest values from the{" "}
                  {props.label === "Speed of Sound"
                    ? props.label
                    : "Standard Pipe"}{" "}
                  table below.
                </Typography>
              }
            >
              <span
                style={{ borderBottom: "1px dotted #404040" }}
                onClick={() => {
                  setOpenTooltip((st) => !st);
                }}
              >
                Estimated Value{" "}
                <Help
                  fontSize="inherit"
                  sx={{ ml: 0.5, color: "grey" }}
                  data-html2canvas-ignore
                />
              </span>
            </Tooltip>
          </ClickAwayListener>
          <Typography
            sx={{
              textAlign: "center",
              backgroundColor: "#ffee58",
              fontWeight: "bold",
              ml: 2,
              p: 0.5,
              px: 2,
              border: "1px solid #00000044",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          >
            {estimatedVal.toFixed(3)} {props.outputUnits}
          </Typography>
        </Typography>

        {/*  ============== DIFFERENCE VALUE ============ */}
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: "16px",
            my: 2,
            pl: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            Difference{" "}
          </span>
          <Typography
            sx={{
              textAlign: "center",
              border: "1px solid #00000044",
              backgroundColor: "#FA5F5566",
              fontWeight: "bold",
              ml: 2,
              p: 0.5,
              px: 2,
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "4px", fontWeight: "normal" }}>
              {sign === "+" ? "+" : "—"}
            </span>
            {diff.toFixed(3)} {props.outputUnits}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default InterpolatedHeader;
