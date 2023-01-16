/**
 * Type: Schedule 40 Copper M Pipe
 *
 * Source: https://www.cooneybrothers.com/userfiles/files/cooneybrothers_typemcoppertubedimensions.pdf
 *
 * Note: All values are in mm.
 */
export default {
  type: "pipe" as const,
  title: "Standard Sch 40 Copper-M Pipe (Thin)",
  labels: ["Nominal Size", "O.D.", "W.T."] as [string, string, string],
  defaultUnits: ["mm", "mm"] as ["mm", "mm"],
  values: [
    {
      nominal_size: "3/8",
      outer_diameter: 12.7,
      wall_thickness: 0.635,
    },
    {
      nominal_size: "1/2",
      outer_diameter: 15.875,
      wall_thickness: 0.711,
    },
    {
      nominal_size: "3/4",
      outer_diameter: 22.225,
      wall_thickness: 0.813,
    },
    {
      nominal_size: "1",
      outer_diameter: 28.575,
      wall_thickness: 0.889,
    },
    {
      nominal_size: "1 1/4",
      outer_diameter: 34.925,
      wall_thickness: 1.067,
    },
    {
      nominal_size: "1 1/2",
      outer_diameter: 41.275,
      wall_thickness: 1.245,
    },
    {
      nominal_size: "2",
      outer_diameter: 53.975,
      wall_thickness: 1.473,
    },
    {
      nominal_size: "2 1/2",
      outer_diameter: 66.675,
      wall_thickness: 1.651,
    },
    {
      nominal_size: "3",
      outer_diameter: 79.375,
      wall_thickness: 1.829,
    },
    {
      nominal_size: "3 1/2",
      outer_diameter: 92.075,
      wall_thickness: 2.108,
    },
    {
      nominal_size: "4",
      outer_diameter: 104.775,
      wall_thickness: 2.413,
    },
    {
      nominal_size: "5",
      outer_diameter: 130.175,
      wall_thickness: 2.769,
    },
    {
      nominal_size: "6",
      outer_diameter: 155.575,
      wall_thickness: 3.099,
    },
    {
      nominal_size: "8",
      outer_diameter: 206.375,
      wall_thickness: 4.318,
    },
    {
      nominal_size: "10",
      outer_diameter: 257.175,
      wall_thickness: 5.385,
    },
    {
      nominal_size: "12",
      outer_diameter: 307.975,
      wall_thickness: 6.452,
    },
  ],
};
