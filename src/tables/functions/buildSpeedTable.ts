import celsius2Fahrenheit from "../../converters/celsius2fahrenheit";
import metersPerSecond2feetPerSecond from "../../converters/mps2fps";
import {
  SoundSpeedWaterTableInterface,
  SpeedUnit,
  TemperatureUnit,
} from "../../types";
import getVisibleRowIndexes from "./getVisibleRowIndexes";

const buildSpeedTable = (
  showFullTable: boolean,
  nearestIndex: number,
  table: SoundSpeedWaterTableInterface,
  outputUnits: [TemperatureUnit, SpeedUnit],
) => {
  // Step 1 - Build title
  const tableTitle = table.title;

  // Step 2 - Build header
  const tableHeader = [
    table.labels[0] + " (°" + outputUnits[0] + ")",
    table.labels[1] + " (" + outputUnits[1] + ")",
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
    const temperature =
      outputUnits[0] === "F"
        ? celsius2Fahrenheit(rowData.temperatureInCelsius)
        : rowData.temperatureInCelsius;
    const speed =
      outputUnits[1] === "ft/s"
        ? metersPerSecond2feetPerSecond(rowData.speedOfSoundInMetersPerSecond)
        : rowData.speedOfSoundInMetersPerSecond;
    return {
      id: rowData.id,
      highlighted,
      temperature: temperature.toFixed(0),
      speed: speed.toFixed(3),
    };
  });

  return {
    tableTitle,
    tableHeader,
    tableRows,
  };
};

export default buildSpeedTable;
