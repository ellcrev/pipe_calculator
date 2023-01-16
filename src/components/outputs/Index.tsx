import { Divider } from "@mui/material";
import { CalculationOutputs } from "../../types";

import InterpolatedHeader from "./InterpolatedHeader";
import ResetButton from "./ResetButton";
import { useState } from "react";

import NearestNominal from "./NearestNominal";
import PipeTable from "./PipeTable";
import SpeedTable from "./SpeedTable";

interface OutputProps extends CalculationOutputs {
  reset: () => void;
}

const Outputs = (props: OutputProps) => {
  const [outerDiameterUnitSystem, setOuterDiameterUnitSystem] = useState<
    "SI" | "IMP"
  >(props.defaultUnits.length === "in" ? "IMP" : "SI");
  const [wallThicknessUnitSystem, setWallThicknessUnitSystem] = useState<
    "SI" | "IMP"
  >(props.defaultUnits.length === "in" ? "IMP" : "SI");
  const [temperatureUnitSystem, setTemperatureUnitSystem] = useState<
    "SI" | "IMP"
  >(props.defaultUnits.temperature === "F" ? "IMP" : "SI");

  return (
    <>
      <Divider
        sx={{ fontSize: "22px", fontWeight: "bold" }}
        data-html2canvas-ignore
      >
        Output
      </Divider>
      <NearestNominal
        nominalSize={
          props.wallThickness.table.values[props.wallThickness.nearestIndex]
            .nominalSize + " in"
        }
      />
      <Divider sx={{ mt: 4 }} />
      <InterpolatedHeader
        label={"Outer Diameter"}
        nearestValue={
          props.wallThickness.table.values[props.wallThickness.nearestIndex]
            .outerDiameterInMM
        }
        interpolatedValue={props.outerDiameterMillimeters}
        outputUnits={outerDiameterUnitSystem === "SI" ? "mm" : "in"}
        onUnitChange={(newSystem) => {
          setOuterDiameterUnitSystem(newSystem);
        }}
      />
      <Divider sx={{ mt: 4 }} />
      <InterpolatedHeader
        label={"Wall Thickness"}
        interpolatedValue={props.wallThickness.interpolatedValueMillimeters}
        nearestValue={
          props.wallThickness.table.values[props.wallThickness.nearestIndex]
            .wallThicknessInMM
        }
        outputUnits={wallThicknessUnitSystem === "SI" ? "mm" : "in"}
        onUnitChange={(newSystem) => {
          setWallThicknessUnitSystem(newSystem);
        }}
      />
      <PipeTable
        table={props.wallThickness.table}
        nearestIndex={props.wallThickness.nearestIndex}
        outputUnits={
          wallThicknessUnitSystem === "SI" ? ["mm", "mm"] : ["in", "in"]
        }
      />
      <Divider sx={{ mt: 4 }} />
      <InterpolatedHeader
        label={"Speed of Sound"}
        interpolatedValue={props.soundSpeed.interpolatedValueMetersPerSecond}
        outputUnits={temperatureUnitSystem === "SI" ? "m/s" : "ft/s"}
        onUnitChange={(newSystem) => {
          setTemperatureUnitSystem(newSystem);
        }}
        nearestValue={
          props.soundSpeed.table.values[props.soundSpeed.nearestIndex]
            .speedOfSoundInMetersPerSecond
        }
      />
      <SpeedTable
        table={props.soundSpeed.table}
        nearestIndex={props.soundSpeed.nearestIndex}
        outputUnits={
          temperatureUnitSystem === "SI" ? ["C", "m/s"] : ["F", "ft/s"]
        }
      />
      <ResetButton reset={props.reset} />
    </>
  );
};

export default Outputs;
