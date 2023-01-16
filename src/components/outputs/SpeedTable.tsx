import {
  Button,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import buildSpeedTable from "../../tables/functions/buildSpeedTable";
import {
  SoundSpeedWaterTableInterface,
  SpeedUnit,
  TemperatureUnit,
} from "../../types";

interface SpeedTableProps {
  table: SoundSpeedWaterTableInterface;
  nearestIndex: number;
  outputUnits: [TemperatureUnit, SpeedUnit];
}

const PipeTable = (props: SpeedTableProps) => {
  const [showFullTable, setShowFullTable] = useState(false);
  const { tableTitle, tableHeader, tableRows } = buildSpeedTable(
    showFullTable,
    props.nearestIndex,
    props.table,
    props.outputUnits,
  );

  // Styles applied to container
  const containerStyles: SxProps = {
    mt: 4,
    border: "1px solid #00000099",
    borderRadius: "8px",
  };

  // Styles applied to table title cell
  const titleStyles: SxProps = {
    fontWeight: "bolder",
    backgroundColor: "#e0e0e0",
    fontSize: "18px",
    py: 2,
    borderBottom: "1px solid #00000066",
    borderRight: "1px solid #e0e0e0",
  };

  // Styles applied to label row
  const labelRowStyles: SxProps = {
    backgroundColor: "#f0f0f0",
  };

  // Styles applied to label entry cells.
  const labelEntryStyles: SxProps = {
    borderBottom: "1px solid #00000066",
    fontWeight: "bold",
  };

  // Styles applied to label & data cells.
  const entryStyles: SxProps = {
    borderRight: "1px solid #c0c0c0",
    textAlign: "center",
  };

  // Styles applied to highlighted row.
  const highlightedStyles = {
    backgroundColor: "lightgreen",
  };

  // Styles applied to cells in highlighted row.
  const highlightedCellStyles = {
    fontWeight: "bold",
  };

  return (
    <>
      <TableContainer sx={containerStyles}>
        <Table size="small" align="center">
          {/* =============== TITLE ============== */}
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2} sx={titleStyles}>
                {tableTitle}
              </TableCell>
            </TableRow>
          </TableHead>
          {/* =============== LABELS ============== */}
          <TableHead>
            <TableRow sx={labelRowStyles}>
              {tableHeader.map((label) => (
                <TableCell
                  key={label}
                  sx={{ ...entryStyles, ...labelEntryStyles }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* =============== ENTRIES ============= */}
          <TableBody>
            {tableRows.map((rowData) => (
              <TableRow
                key={rowData.id}
                sx={rowData.highlighted ? highlightedStyles : {}}
              >
                <TableCell
                  sx={{
                    ...entryStyles,
                    ...(rowData.highlighted ? highlightedCellStyles : {}),
                  }}
                >
                  {rowData.temperature}
                </TableCell>
                <TableCell
                  sx={{
                    ...entryStyles,
                    ...(rowData.highlighted ? highlightedCellStyles : {}),
                  }}
                >
                  {rowData.speed}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        data-html2canvas-ignore
        sx={{ mx: "auto", display: "block", mt: 1 }}
        onClick={() => {
          setShowFullTable((st) => !st);
        }}
      >
        {showFullTable ? "Shrink" : "Expand"}
      </Button>
    </>
  );
};

export default PipeTable;
