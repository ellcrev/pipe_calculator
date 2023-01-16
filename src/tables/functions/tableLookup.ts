import {
  PipeScheduleName,
  PipeTableInterface,
  SoundSpeedWaterTableInterface,
  TableInterface,
} from "../../types";
import Sch40_CarbonSteel from "../Sch40_CarbonSteel";
import Sch40_Copper_K from "../Sch40_Copper_K";
import Sch40_Copper_L from "../Sch40_Copper_L";
import Sch40_Copper_M from "../Sch40_Copper_M";
import Sch40_StainlessSteel from "../Sch40_StainlessSteel";
import SoundSpeedWaterTable from "../SoundSpeedWater";

const tableLookup = (tableName: PipeScheduleName | "speed"): TableInterface => {
  let table;
  if (tableName === "stainless-steel") {
    table = Sch40_StainlessSteel;
  } else if (tableName === "carbon-steel") {
    table = Sch40_CarbonSteel;
  } else if (tableName === "copper-k") {
    table = Sch40_Copper_K;
  } else if (tableName === "copper-l") {
    table = Sch40_Copper_L;
  } else if (tableName === "copper-m") {
    table = Sch40_Copper_M;
  } else if (tableName == "speed") {
    table = SoundSpeedWaterTable;
  }
  if (table) {
    if (table.type === "pipe") {
      const pipeTable: PipeTableInterface = {
        ...table,
        type: "pipe",
        labels: table.labels as [string, string, string],
        values: table.values.map((val) => {
          return {
            id: crypto.randomUUID(),
            nominalSize: val.nominal_size,
            outerDiameterInMM: val.outer_diameter,
            wallThicknessInMM: val.wall_thickness,
          };
        }),
      };
      return pipeTable;
    } else if (table.type === "speed") {
      const speedTable: SoundSpeedWaterTableInterface = {
        ...table,
        type: "speed",
        labels: table.labels as [string, string],
        values: table.values.map((val) => {
          return {
            id: crypto.randomUUID(),
            temperatureInCelsius: val.temperature,
            speedOfSoundInMetersPerSecond: val.speed_of_sound,
          };
        }),
      };
      return speedTable;
    }
  }
  throw Error("Could not find table.");
};

export default tableLookup;
