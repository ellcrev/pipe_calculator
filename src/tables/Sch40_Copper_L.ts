/**
 * Type: Schedule 40 Copper L Pipe
 *
 * Source: https://taylorwalraven.ca/copper-tubing-data-Type-L.php
 *
 * Note: All values are in mm.
 */
export default {
  type: "pipe" as const,
  title: "Standard Sch 40 Copper-L Pipe (Normal)",
  labels: ["Nominal Size", "O.D.", "W.T."] as [string, string, string],
  defaultUnits: ["mm", "mm"] as ["mm", "mm"],
  values: [
    {
      nominal_size: "1/4",
      outer_diameter: 9.53,
      wall_thickness: 0.762,
    },
    {
      nominal_size: "3/8",
      outer_diameter: 12.7,
      wall_thickness: 0.889,
    },
    {
      nominal_size: "1/2",
      outer_diameter: 15.88,
      wall_thickness: 1.016,
    },
    {
      nominal_size: "5/8",
      outer_diameter: 19.05,
      wall_thickness: 1.067,
    },
    {
      nominal_size: "3/4",
      outer_diameter: 22.23,
      wall_thickness: 1.143,
    },
    {
      nominal_size: "1",
      outer_diameter: 28.58,
      wall_thickness: 1.27,
    },
    {
      nominal_size: "1 1/4",
      outer_diameter: 34.93,
      wall_thickness: 1.397,
    },
    {
      nominal_size: "1 1/2",
      outer_diameter: 41.28,
      wall_thickness: 1.524,
    },
    {
      nominal_size: "2",
      outer_diameter: 53.98,
      wall_thickness: 1.778,
    },
    {
      nominal_size: "2 1/2",
      outer_diameter: 66.68,
      wall_thickness: 2.032,
    },
    {
      nominal_size: "3",
      outer_diameter: 79.38,
      wall_thickness: 2.286,
    },
    {
      nominal_size: "3 1/2",
      outer_diameter: 90.08,
      wall_thickness: 2.54,
    },
    {
      nominal_size: "4",
      outer_diameter: 104.78,
      wall_thickness: 2.794,
    },
    {
      nominal_size: "5",
      outer_diameter: 130.18,
      wall_thickness: 3.175,
    },
    {
      nominal_size: "6",
      outer_diameter: 155.58,
      wall_thickness: 3.556,
    },
    {
      nominal_size: "8",
      outer_diameter: 206.38,
      wall_thickness: 5.08,
    },
    {
      nominal_size: "10",
      outer_diameter: 257.18,
      wall_thickness: 6.35,
    },
    {
      nominal_size: "12",
      outer_diameter: 307.98,
      wall_thickness: 7.112,
    },
  ],
};
