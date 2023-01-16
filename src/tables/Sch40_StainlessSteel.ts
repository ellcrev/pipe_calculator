/**
 * Type: Schedule 40 Stainless Steel Pipe
 *
 * Source: https://www.n-pipe.com/schedule-40-stainless-steel-pipe-dimensions-thickness.html
 *
 * Note: All values are in mm.
 */
export default {
  type: "pipe" as const,
  title: "Standard Sch 40 Stainless Steel Pipe",
  labels: ["Nominal Size", "O.D.", "W.T."] as [string, string, string],
  defaultUnits: ["mm", "mm"] as ["mm", "mm"],
  values: [
    {
      nominal_size: "1/2",
      outer_diameter: 21.3,
      wall_thickness: 1.65,
    },
    {
      nominal_size: "3/4",
      outer_diameter: 26.7,
      wall_thickness: 1.65,
    },
    {
      nominal_size: "1",
      outer_diameter: 33.4,
      wall_thickness: 1.65,
    },
    {
      nominal_size: "1 1/4",
      outer_diameter: 42.2,
      wall_thickness: 1.65,
    },
    {
      nominal_size: "1 1/2",
      outer_diameter: 48.3,
      wall_thickness: 1.65,
    },
    {
      nominal_size: "2",
      outer_diameter: 60.3,
      wall_thickness: 1.65,
    },
    {
      nominal_size: "2 1/2",
      outer_diameter: 73,
      wall_thickness: 2.11,
    },
    {
      nominal_size: "3",
      outer_diameter: 88.9,
      wall_thickness: 2.11,
    },
    {
      nominal_size: "3 1/2",
      outer_diameter: 101.6,
      wall_thickness: 2.11,
    },
    {
      nominal_size: "4",
      outer_diameter: 114.3,
      wall_thickness: 2.11,
    },
    {
      nominal_size: "5",
      outer_diameter: 141.3,
      wall_thickness: 2.77,
    },
    {
      nominal_size: "6",
      outer_diameter: 168.3,
      wall_thickness: 2.77,
    },
    {
      nominal_size: "8",
      outer_diameter: 219.1,
      wall_thickness: 2.77,
    },
    {
      nominal_size: "10",
      outer_diameter: 273.1,
      wall_thickness: 3.4,
    },
    {
      nominal_size: "12",
      outer_diameter: 323.9,
      wall_thickness: 3.96,
    },
    {
      nominal_size: "14",
      outer_diameter: 355.6,
      wall_thickness: 3.96,
    },
    {
      nominal_size: "16",
      outer_diameter: 406.4,
      wall_thickness: 4.19,
    },
    {
      nominal_size: "18",
      outer_diameter: 457,
      wall_thickness: 4.19,
    },
    {
      nominal_size: "20",
      outer_diameter: 508,
      wall_thickness: 4.78,
    },
    {
      nominal_size: "22",
      outer_diameter: 559,
      wall_thickness: 4.78,
    },
    {
      nominal_size: "24",
      outer_diameter: 610,
      wall_thickness: 5.54,
    },
    {
      nominal_size: "30",
      outer_diameter: 762,
      wall_thickness: 6.35,
    },
  ],
};
