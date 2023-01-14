import { Box, Tooltip, Typography } from "@mui/material";
import { CalculationOutputs } from "../calculate";
import millimeters2Inches from "../converters/mm2in";
import metersPerSecond2feetPerSecond from "../converters/mps2fps";
import TableSelector from "./TableSelector";

export interface OutputSlotProps {
  label: string;
  units: {
    useInches: boolean;
    useFahrenheit: boolean;
    useFeetPerSecond: boolean;
  };
  type:
    | CalculationOutputs["sound_speed"]
    | CalculationOutputs["outer_diameter"]
    | CalculationOutputs["wall_thickness"];
}

const OutputSlot = (props: OutputSlotProps) => {
  const nearestEntryValue =
    typeof props.type !== "number" && props.type.table.type === "pipe"
      ? props.type.table.values[props.type.nearest_index].wall_thickness
      : typeof props.type !== "number" && props.type.table.type === "speed"
      ? props.type.table.values[props.type.nearest_index].speed_of_sound
      : null;
  const errorMarginNum =
    nearestEntryValue !== null && typeof props.type !== "number"
      ? nearestEntryValue - props.type.interpolated_value
      : null;

  const units = (() => {
    // Outer Diameter
    if (typeof props.type === "number") {
      return props.units.useInches ? ["in", "in"] : ["mm", "mm"];
    } else if (props.type.table.type === "pipe") {
      return props.units.useInches ? ["in", "in"] : ["mm", "mm"];
    } else {
      return [
        props.units.useFahrenheit ? "°F" : "°C",
        props.units.useFeetPerSecond ? "ft/s" : "m/s",
      ];
    }
  })();

  const errorMarginNumConverted =
    (() => {
      let val: string = "";
      if (
        typeof props.type !== "number" &&
        props.type.table.type === "pipe" &&
        props.units.useInches &&
        errorMarginNum !== null
      ) {
        val = millimeters2Inches(errorMarginNum).toFixed(2);
      } else if (
        typeof props.type !== "number" &&
        props.type.table.type === "pipe" &&
        errorMarginNum !== null
      ) {
        val = errorMarginNum.toFixed(2);
      } else if (
        typeof props.type !== "number" &&
        props.type.table.type === "speed" &&
        props.units.useFeetPerSecond &&
        errorMarginNum !== null
      ) {
        val = metersPerSecond2feetPerSecond(errorMarginNum).toFixed(2);
      } else if (
        typeof props.type !== "number" &&
        props.type.table.type === "speed" &&
        errorMarginNum !== null
      ) {
        val = errorMarginNum.toFixed(2);
      }
      if (val && val[0] !== "-") {
        val = "+" + val.slice(0);
      }
      if (val) {
        return val;
      }
      return null;
    })() +
    " " +
    units[1];

  const displayValue = (() => {
    if (typeof props.type === "number") {
      if (units[0] === "in") {
        return millimeters2Inches(props.type).toFixed(2) + " " + units[0];
      }
      return props.type.toFixed(2) + " " + units[0];
    } else if (props.type.table.type === "pipe" && errorMarginNum !== null) {
      if (units[0] === "in" && errorMarginNum !== null) {
        let errNum = millimeters2Inches(errorMarginNum);
        const sign = errNum < 0 ? "-" : "+";
        if (sign === "-") {
          errNum *= -1;
        }
        return (
          millimeters2Inches(props.type.interpolated_value).toFixed(2) +
          " " +
          sign +
          " " +
          errNum.toFixed(2) +
          " " +
          units[0]
        );
      }
      let errNum = errorMarginNum;
      const sign = errNum < 0 ? "-" : "+";
      if (sign === "-") {
        errNum *= -1;
      }
      return (
        props.type.interpolated_value.toFixed(2) +
        " " +
        sign +
        " " +
        errNum.toFixed(2) +
        " " +
        units[0]
      );
    } else if (errorMarginNum !== null) {
      if (units[1] === "ft/s") {
        let errNum = metersPerSecond2feetPerSecond(errorMarginNum || 0);
        const sign = errNum < 0 ? "-" : "+";
        if (sign === "-") {
          errNum *= -1;
        }
        return (
          metersPerSecond2feetPerSecond(props.type.interpolated_value).toFixed(
            2,
          ) +
          " " +
          sign +
          " " +
          errNum.toFixed(2) +
          " " +
          units[1]
        );
      }
      let errNum = errorMarginNum;
      const sign = errNum < 0 ? "-" : "+";
      if (sign === "-") {
        errNum *= -1;
      }
      return (
        props.type.interpolated_value.toFixed(2) +
        " " +
        sign +
        " " +
        errNum.toFixed(2) +
        " " +
        units[1]
      );
    }
  })();

  return (
    <Box>
      <Box
        sx={{
          mt: 4,
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontSize={"18px"}>
          {props.label}
        </Typography>
        <Tooltip
          disableInteractive={typeof props.type === "number"}
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
                },
              },
            },
          }}
          arrow
          title={
            typeof props.type !== "number" ? (
              <Typography>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#4caf50",
                  }}
                >
                  {(() => {
                    if (
                      props.units.useInches &&
                      props.type.table.type === "pipe"
                    ) {
                      return millimeters2Inches(
                        props.type.interpolated_value,
                      ).toFixed(2);
                    } else if (props.type.table.type === "pipe") {
                      return props.type.interpolated_value.toFixed(2);
                    } else if (
                      props.units.useFeetPerSecond &&
                      props.type.table.type === "speed"
                    ) {
                      return metersPerSecond2feetPerSecond(
                        props.type.interpolated_value,
                      ).toFixed(2);
                    } else {
                      return props.type.interpolated_value.toFixed(2);
                    }
                  })() +
                    " " +
                    units[1]}
                </span>{" "}
                is the interpolated {props.label.toLowerCase()}.
                <br />
                <br />
                <span
                  style={{
                    fontWeight: "bold",
                    color:
                      errorMarginNumConverted[0] === "+"
                        ? "#4caf50"
                        : "#FF5733",
                  }}
                >
                  {errorMarginNumConverted}
                </span>{" "}
                is the error margin from the interpolated{" "}
                {props.label.toLowerCase()} to the nearest{" "}
                {props.label.toLowerCase() === "wall thickness"
                  ? "outer diameter"
                  : "temperature"}
                .
              </Typography>
            ) : null
          }
        >
          <Box
            fontWeight={"bold"}
            sx={{
              cursor: "pointer",
              position: "relative",
              backgroundColor: "lightgreen",
              textAlign: "center",
              p: 1,
              borderRadius: "4px",
              fontSize: "18px",
            }}
          >
            {displayValue}
          </Box>
        </Tooltip>
      </Box>
      {typeof props.type !== "number" ? (
        <TableSelector
          table={props.type.table}
          units={units as [string, string]}
          closest_index={props.type.nearest_index}
        />
      ) : null}
    </Box>
  );
};

export default OutputSlot;
