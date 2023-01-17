import { Divider } from "@mui/material";
import { CalculationOutputs } from "../../types";

import InterpolatedHeader from "./InterpolatedHeader";
import ResetButton from "./ResetButton";
import { Dispatch, SetStateAction, useState } from "react";

import NearestNominal from "./NearestNominal";
import PipeTable from "./PipeTable";
import SpeedTable from "./SpeedTable";

interface OutputProps extends CalculationOutputs {
  screenshotting: boolean;
  reset: () => void;
  ODSystem: "SI" | "IMP";
  setODSystem: Dispatch<SetStateAction<"SI" | "IMP">>;
  WTSystem: "SI" | "IMP";
  setWTSystem: Dispatch<SetStateAction<"SI" | "IMP">>;
  speedSystem: "SI" | "IMP";
  setSpeedSystem: Dispatch<SetStateAction<"SI" | "IMP">>;
}

const Outputs = (props: OutputProps) => {
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
        screenshotting={props.screenshotting}
        label={"Outer Diameter"}
        nearestValue={
          props.wallThickness.table.values[props.wallThickness.nearestIndex]
            .outerDiameterInMM
        }
        interpolatedValue={props.outerDiameterMillimeters}
        outputUnits={props.ODSystem === "SI" ? "mm" : "in"}
        onUnitChange={(newSystem) => {
          props.setODSystem(newSystem);
        }}
      />
      <Divider sx={{ mt: 4 }} />
      <InterpolatedHeader
        screenshotting={props.screenshotting}
        label={"Wall Thickness"}
        interpolatedValue={props.wallThickness.interpolatedValueMillimeters}
        nearestValue={
          props.wallThickness.table.values[props.wallThickness.nearestIndex]
            .wallThicknessInMM
        }
        outputUnits={props.WTSystem === "SI" ? "mm" : "in"}
        onUnitChange={(newSystem) => {
          props.setWTSystem(newSystem);
        }}
      />
      <PipeTable
        table={props.wallThickness.table}
        nearestIndex={props.wallThickness.nearestIndex}
        outputUnits={props.WTSystem === "SI" ? ["mm", "mm"] : ["in", "in"]}
      />
      <Divider sx={{ mt: 4 }} />
      <InterpolatedHeader
        screenshotting={props.screenshotting}
        label={"Speed of Sound"}
        interpolatedValue={props.soundSpeed.interpolatedValueMetersPerSecond}
        outputUnits={props.speedSystem === "SI" ? "m/s" : "ft/s"}
        onUnitChange={(newSystem) => {
          props.setSpeedSystem(newSystem);
        }}
        nearestValue={
          props.soundSpeed.table.values[props.soundSpeed.nearestIndex]
            .speedOfSoundInMetersPerSecond
        }
      />
      <SpeedTable
        table={props.soundSpeed.table}
        nearestIndex={props.soundSpeed.nearestIndex}
        outputUnits={props.speedSystem === "SI" ? ["C", "m/s"] : ["F", "ft/s"]}
      />
      <ResetButton reset={props.reset} />
    </>
  );
};

export default Outputs;
