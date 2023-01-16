import { Box, Collapse, Paper, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRef, useState } from "react";
import { calculate } from "../src/calculate";
import Inputs from "../src/components/inputs/Index";
import Output from "../src/components/outputs/Index";
import SaveSettings from "../src/components/save/Index";
import SaveButton from "../src/components/save/SaveButton";
import screenshot from "../src/screenshot";
import { CalculationOutputs } from "../src/types";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<CalculationOutputs | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
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
          Flexim Pipe Calculator
        </Typography>
        <Box>
          <Inputs
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
          <Collapse in={output !== null}>
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
        </Box>
        <Collapse in={output !== null}>
          <SaveSettings />
          <SaveButton
            saveCallback={async () => {
              if (containerRef.current) {
                const res = await screenshot(containerRef.current);
                await new Promise((res) =>
                  setTimeout(() => {
                    res(true);
                  }, 500),
                );
                return res;
              }
              return null;
            }}
          />
        </Collapse>
      </Paper>
    </Box>
  );
};

export default Home;
