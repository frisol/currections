// puzzles.js
// Single puzzle set for Currections.
// Groups ordered by difficulty:
//   index 0 → Yellow  (easiest)
//   index 1 → Green
//   index 2 → Blue
//   index 3 → Purple  (hardest)

const PUZZLES = [
  {
    id: 21,
    groups: [
      {
        category: "Bluecurrent platform references",
        color: "yellow",
        words: ["AZURE", "M365", "DYNAMICS", "ADAPTIVE"],
      },
      {
        category: "Planning and reporting terms",
        color: "green",
        words: ["BUDGET", "FORECAST", "ACTUALS", "REPORTING"],
      },
      {
        category: "Metering / revenue model words",
        color: "blue",
        words: ["METER", "RATES", "RETAILER", "DEPLOYMENT"],
      },
      {
        category: "Words that can follow 'blue'",
        color: "purple",
        words: ["BIRD", "MOON", "PRINT", "TOOTH"],
      },
    ],
  },
];
