import {
  Box,
  Button,
  Collapse,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import {
  PipeTableInterface,
  SoundSpeedWaterTableInterface,
} from "../calculate";
import celsius2Fahrenheit from "../converters/celsius2fahrenheit";
import millimeters2Inches from "../converters/mm2in";
import metersPerSecond2feetPerSecond from "../converters/mps2fps";

interface TableSelectorProps {
  table: PipeTableInterface | SoundSpeedWaterTableInterface;
  closest_index: number;
  units: [string, string];
}

const TableSelector = (props: TableSelectorProps) => {
  const [showFull, setShowFull] = useState(false);
  const tableIndexes = (() => {
    if (showFull) {
      return props.table.values.map((item, i) => i);
    }
    if (props.closest_index === 0) {
      return [0, 1, 2];
    }
    if (props.closest_index === props.table.values.length - 1) {
      return [
        props.closest_index - 2,
        props.closest_index - 1,
        props.closest_index,
      ];
    }
    return [
      props.closest_index - 1,
      props.closest_index,
      props.closest_index + 1,
    ];
  })();
  const visibleEntries = tableIndexes.map((idx) => {
    if (props.table.type === "pipe") {
      const entries = props.table.values as PipeTableInterface["values"];
      return {
        type: "pipe" as const,
        ...entries[idx],
        selected: idx === props.closest_index,
      };
    }
    if (props.table.type === "speed") {
      const entries = props.table
        .values as SoundSpeedWaterTableInterface["values"];
      return {
        type: "speed" as const,
        ...entries[idx],
        selected: idx === props.closest_index,
      };
    }
    throw Error("Unknown table type.");
  });

  const formatEntry = (num: number, unit: string) => {
    if (unit === "mm" || unit === "°C" || unit === "m/s") {
      return num.toString();
    } else if (unit === "in") {
      return millimeters2Inches(num).toFixed(3);
    } else if (unit === "°F") {
      return celsius2Fahrenheit(num).toFixed(0);
    } else if (unit === "ft/s") {
      return metersPerSecond2feetPerSecond(num).toFixed(0);
    }
    throw Error("");
  };
  return (
    <Box>
      <TableContainer
        sx={{ border: "1px solid #00000033", borderRadius: "4px" }}
      >
        <Table size="small" align="center">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={2}
                align="center"
                sx={{
                  fontWeight: "bolder",
                  backgroundColor: "#e0e0e0",
                  fontSize: "18px",
                  py: 2,
                  borderBottom: "1px solid #00000033",
                }}
              >
                {props.table.title}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead
            sx={{ backgroundColor: "#f0f0f0", borderTop: "1px solid black" }}
          >
            <TableRow>
              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  borderRight: "1px solid #00000033",
                  borderBottom: "1px solid #00000033",
                }}
              >
                {props.table.labels[0]} ({props.units[0]})
              </TableCell>

              <TableCell
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  borderBottom: "1px solid #00000033",
                }}
              >
                {props.table.labels[1]} ({props.units[1]})
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleEntries.map((entry) => {
              return (
                <TableRow
                  key={entry.id}
                  sx={{
                    backgroundColor: entry.selected ? "lightgreen" : "auto",
                  }}
                >
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontWeight: entry.selected ? "bold" : "auto",
                      borderRight: "1px solid #00000033",
                    }}
                  >
                    {entry.type === "pipe"
                      ? formatEntry(entry.outer_diameter, props.units[0])
                      : formatEntry(entry.temperature, props.units[0])}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontWeight: entry.selected ? "bold" : "auto",
                    }}
                  >
                    {entry.type === "pipe"
                      ? formatEntry(entry.wall_thickness, props.units[1])
                      : formatEntry(entry.speed_of_sound, props.units[1])}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        sx={{ display: "block", mx: "auto", mt: 1 }}
        onClick={() => {
          setShowFull((st) => !st);
        }}
        color={!showFull ? "primary" : "error"}
      >
        {showFull ? "Shrink" : "Expand"} Table
      </Button>
    </Box>
  );
};

export default TableSelector;
