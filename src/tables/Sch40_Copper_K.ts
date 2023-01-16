/**
 * Type: Schedule 40 Copper K Pipe
 *
 * Source: https://taylorwalraven.ca/copper-tubing-data-Type-K.php
 *
 * Note: All values are in mm.
 */
export default {
  type: "pipe" as const,
  title: "Standard Sch 40 Copper-K Pipe (Thick)",
  labels: ["Nominal Size", "O.D.", "W.T."] as [string, string, string],
  defaultUnits: ["mm", "mm"] as ["mm", "mm"],
  values: [
    {
      nominal_size: "1/4",
      outer_diameter: 9.63,
      wall_thickness: 0.889,
    },
    {
      nominal_size: "3/8",
      outer_diameter: 12.7,
      wall_thickness: 1.2446,
    },
    {
      nominal_size: "1/2",
      outer_diameter: 15.88,
      wall_thickness: 1.2446,
    },
    {
      nominal_size: "5/8",
      outer_diameter: 19.05,
      wall_thickness: 1.2446,
    },
    {
      nominal_size: "3/4",
      outer_diameter: 22.23,
      wall_thickness: 1.651,
    },
    {
      nominal_size: "1",
      outer_diameter: 28.58,
      wall_thickness: 1.651,
    },
    {
      nominal_size: "1 1/4",
      outer_diameter: 34.93,
      wall_thickness: 1.651,
    },
    {
      nominal_size: "1 1/2",
      outer_diameter: 41.28,
      wall_thickness: 1.8288,
    },
    {
      nominal_size: "2",
      outer_diameter: 53.8,
      wall_thickness: 2.1082,
    },
    {
      nominal_size: "2 1/2",
      outer_diameter: 66.68,
      wall_thickness: 2.413,
    },
    {
      nominal_size: "3",
      outer_diameter: 79.38,
      wall_thickness: 2.7686,
    },
    {
      nominal_size: "3 1/2",
      outer_diameter: 90.08,
      wall_thickness: 3.048,
    },
    {
      nominal_size: "4",
      outer_diameter: 104.78,
      wall_thickness: 3.4036,
    },
    {
      nominal_size: "5",
      outer_diameter: 130.18,
      wall_thickness: 4.064,
    },
    {
      nominal_size: "6",
      outer_diameter: 155.58,
      wall_thickness: 4.8768,
    },
    {
      nominal_size: "8",
      outer_diameter: 206.38,
      wall_thickness: 6.8834,
    },
    {
      nominal_size: "10",
      outer_diameter: 257.18,
      wall_thickness: 8.5852,
    },
    {
      nominal_size: "12",
      outer_diameter: 307.98,
      wall_thickness: 10.287,
    },
  ],
};
