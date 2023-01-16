// ================== Table Typings ====================
export interface PipeTableInterface {
  type: "pipe";
  title: string;
  labels: [string, string, string];
  values: {
    id: string;
    outerDiameterInMM: number;
    wallThicknessInMM: number;
    nominalSize: string;
  }[];
}
export interface SoundSpeedWaterTableInterface {
  type: "speed";
  title: string;
  labels: [string, string];
  values: {
    id: string;
    temperatureInCelsius: number;
    speedOfSoundInMetersPerSecond: number;
  }[];
}
export type TableInterface = PipeTableInterface | SoundSpeedWaterTableInterface;

// ================= Unit/Pipe Schedule Typings ==============
export type LengthUnit = "mm" | "in";
export type SpeedUnit = "m/s" | "ft/s";
export type TemperatureUnit = "F" | "C";
export type PipeScheduleName =
  | "stainless-steel"
  | "carbon-steel"
  | "copper-k"
  | "copper-l"
  | "copper-m";

// ======================= Calculation Typings ====================
export interface CalculationInputs {
  circumference: number;
  circumferenceUnits: LengthUnit;
  thickness: number;
  thicknessUnits: LengthUnit;
  temperature: number;
  temperatureUnits: TemperatureUnit;
  pipeSchedule: PipeScheduleName;
}
export interface CalculationOutputs {
  outerDiameterMillimeters: number;
  wallThickness: {
    table: PipeTableInterface;
    nearestIndex: number;
    interpolatedValueMillimeters: number;
  };
  soundSpeed: {
    table: SoundSpeedWaterTableInterface;
    nearestIndex: number;
    interpolatedValueMetersPerSecond: number;
  };
  defaultUnits: {
    length: LengthUnit;
    speed: SpeedUnit;
    temperature: TemperatureUnit;
  };
}
