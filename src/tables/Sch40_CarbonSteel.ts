/**
 * Type: Schedule 40 Carbon Steel Pipe
 *
 * Source: https://www.reliablepipestubesltd.com/schedule-40-carbon-steel-pipe.html
 *
 * Note: All values are in mm EXCEPT nominal (whcih)
 */
export default {
  type: "pipe" as const,
  title: "Standard Sch 40 Carbon Steel Pipe",
  labels: ["Nominal Size", "O.D.", "W.T."] as [string, string, string],
  defaultUnits: ["mm", "mm"] as ["mm", "mm"],
  values: [
    {
      nominal_size: "1/8",
      outer_diameter: 10.3,
      wall_thickness: 1.73,
    },
    {
      nominal_size: "1/4",
      outer_diameter: 13.7,
      wall_thickness: 2.24,
    },
    {
      nominal_size: "1/2",
      outer_diameter: 21.3,
      wall_thickness: 2.77,
    },
    {
      nominal_size: "3/4",
      outer_diameter: 26.7,
      wall_thickness: 2.87,
    },
    {
      nominal_size: "1",
      outer_diameter: 33.4,
      wall_thickness: 3.38,
    },
    {
      nominal_size: "1 1/4",
      outer_diameter: 42.2,
      wall_thickness: 3.56,
    },
    {
      nominal_size: "1 1/2",
      outer_diameter: 48.3,
      wall_thickness: 3.68,
    },
    {
      nominal_size: "2",
      outer_diameter: 60.3,
      wall_thickness: 3.91,
    },
    {
      nominal_size: "2 1/2",
      outer_diameter: 73,
      wall_thickness: 5.16,
    },
    {
      nominal_size: "3",
      outer_diameter: 88.9,
      wall_thickness: 5.49,
    },
    {
      nominal_size: "3 1/2",
      outer_diameter: 101.6,
      wall_thickness: 5.74,
    },
    {
      nominal_size: "4",
      outer_diameter: 114.3,
      wall_thickness: 6.02,
    },
    {
      nominal_size: "5",
      outer_diameter: 141.3,
      wall_thickness: 6.55,
    },
    {
      nominal_size: "6",
      outer_diameter: 168.3,
      wall_thickness: 7.11,
    },
    {
      nominal_size: "8",
      outer_diameter: 219.1,
      wall_thickness: 8.18,
    },
    {
      nominal_size: "10",
      outer_diameter: 273,
      wall_thickness: 9.27,
    },
    {
      nominal_size: "12",
      outer_diameter: 323.8,
      wall_thickness: 10.31,
    },
    {
      nominal_size: "14",
      outer_diameter: 355.6,
      wall_thickness: 11.13,
    },
    {
      nominal_size: "16",
      outer_diameter: 406.4,
      wall_thickness: 12.7,
    },
    {
      nominal_size: "18",
      outer_diameter: 457,
      wall_thickness: 14.27,
    },
    {
      nominal_size: "20",
      outer_diameter: 508,
      wall_thickness: 15.09,
    },
    {
      nominal_size: "24",
      outer_diameter: 610,
      wall_thickness: 17.48,
    },
    {
      nominal_size: "32",
      outer_diameter: 813,
      wall_thickness: 17.48,
    },
  ],
};
