import millimeters2Inches from "../../converters/mm2in";
import { LengthUnit, PipeTableInterface } from "../../types";
import getVisibleRowIndexes from "./getVisibleRowIndexes";

const buildPipeTable = (
  showFullTable: boolean,
  nearestIndex: number,
  table: PipeTableInterface,
  outputUnits: [LengthUnit, LengthUnit],
) => {
  // Step 1 - Build title
  const tableTitle = table.title;

  // Step 2 - Build header
  const tableHeader = [
    table.labels[0] + " (in)",
    table.labels[1] + " (" + outputUnits[0] + ")",
    table.labels[2] + " (" + outputUnits[1] + ")",
  ];

  // Step 3 - Determine visible row indexes.
  const visibleRowIndexes = getVisibleRowIndexes(
    table,
    nearestIndex,
    showFullTable,
  );

  // Step 4 - Build table rows
  const tableRows = visibleRowIndexes.map((rowIndex) => {
    const rowData = table.values[rowIndex];
    const highlighted = rowIndex === nearestIndex;
    const outerDiameter =
      outputUnits[0] === "in"
        ? millimeters2Inches(rowData.outerDiameterInMM)
        : rowData.outerDiameterInMM;
    const wallThickness =
      outputUnits[1] === "in"
        ? millimeters2Inches(rowData.wallThicknessInMM)
        : rowData.wallThicknessInMM;
    return {
      id: rowData.id,
      highlighted,
      nominalSize: rowData.nominalSize,
      outerDiameter: outerDiameter.toFixed(3),
      wallThickness: wallThickness.toFixed(3),
    };
  });

  return {
    tableTitle,
    tableHeader,
    tableRows,
  };
};

export default buildPipeTable;
