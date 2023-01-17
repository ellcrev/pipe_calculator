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

export interface AppData {
  email: string;
  info: {
    time: string;
    meter_number: string;
    ip_address: string;
    location: {
      latitude: string;
      longitude: string;
    };
    additional_notes: string;
  };
  inputs: {
    circumference: string;
    thickness: string;
    temperature: string;
    schedule: string;
  };
  outputs: {
    nominal_size: string;
    outer_diameter: {
      nearest: string;
      estimated: string;
      difference: string;
    };
    wall_thickness: {
      nearest: string;
      estimated: string;
      difference: string;
    };
    speed_of_sound: {
      nearest: string;
      estimated: string;
      difference: string;
    };
  };
}
