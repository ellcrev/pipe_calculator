import { Box, Collapse, Paper, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRef, useState } from "react";
import { calculate } from "../src/calculate";
import Inputs from "../src/components/inputs/Index";
import Output from "../src/components/outputs/Index";
import SaveSettings from "../src/components/save-settings/Index";
import SaveButton from "../src/components/save-settings/DownloadButton";
import { CalculationOutputs } from "../src/types";
import getCurrentTime from "../src/converters/timeFormat";
import download from "../src/download";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<CalculationOutputs | null>(null);
  const [screenshotting, setScreenshotting] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const order = screenshotting
    ? ["save", "inputs", "output"]
    : ["inputs", "output", "save"];
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        ref={containerRef}
        sx={{
          px: 2,
          py: 2,
          width: "100%",
          border: "2px solid black",
          maxWidth: "600px",
          borderRadius: "0px",
          "@media only screen and (min-width: 600px)": {
            borderRadius: "8px",
            my: 4,
            px: 8,
            py: 4,
          },
        }}
        elevation={0}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            mt: 2,
            mb: 4,
            px: 2,
            fontWeight: 500,
            fontSize: "24px",
            "@media screen and (min-width: 400px)": {
              fontSize: "28px",
            },
          }}
        >
          {screenshotting ? "Meter Report" : "Flexim Pipe Calculator"}
        </Typography>
        {screenshotting ? (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "20px",
              marginTop: "-16px",
              fontWeight: "bold",
            }}
          >
            {getCurrentTime()}
          </Typography>
        ) : null}
        <Box>
          {order.map((orderItem) => {
            if (orderItem === "inputs") {
              return (
                <Inputs
                  key={orderItem}
                  clearOutput={() => {
                    if (output) {
                      setOutput(null);
                    }
                  }}
                  loading={loading}
                  onSubmit={
                    !output
                      ? async (inputData) => {
                          setOutput(null);
                          setLoading(true);
                          const outputData = calculate(inputData);
                          setTimeout(() => {
                            setLoading(false);
                            setOutput(outputData);
                          }, 1000);
                          return true;
                        }
                      : undefined
                  }
                />
              );
            } else if (orderItem === "output") {
              return (
                <Collapse in={output !== null} key={orderItem}>
                  <Box>
                    {output !== null ? (
                      <Output
                        {...output}
                        reset={() => {
                          setOutput(null);
                        }}
                      />
                    ) : null}
                  </Box>
                </Collapse>
              );
            } else {
              return (
                <Collapse in={output !== null} key={orderItem}>
                  <SaveSettings isScreenshotting={screenshotting} />
                  <SaveButton
                    saveCallback={async () => {
                      if (containerRef.current) {
                        const p1 = download(containerRef.current, () => {
                          setScreenshotting((st) => !st);
                        });
                        const p2 = new Promise((res) => {
                          setTimeout(() => {
                            res(true);
                          }, 500);
                        });
                        const results = await Promise.all([p1, p2]);
                        return results[0];
                      }
                      return null;
                    }}
                  />
                </Collapse>
              );
            }
          })}
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
