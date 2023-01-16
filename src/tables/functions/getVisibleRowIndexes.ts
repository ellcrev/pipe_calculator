import { TableInterface } from "../../types";

const getVisibleRowIndexes = (
  table: TableInterface,
  nearestIndex: number,
  showFullTable: boolean,
) => {
  if (showFullTable) {
    return table.values.map((_item, i) => i);
  }
  if (nearestIndex === 0) {
    return [0, 1, 2];
  }
  if (nearestIndex === table.values.length - 1) {
    return [nearestIndex - 2, nearestIndex - 1, nearestIndex];
  }
  return [nearestIndex - 1, nearestIndex, nearestIndex + 1];
};

export default getVisibleRowIndexes;
