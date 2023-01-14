import {
  Box,
  CircularProgress,
  Collapse,
  Paper,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import { calculate, CalculationOutputs } from "../src/calculate";
import Inputs from "../src/components/Input";
import Output from "../src/components/Output";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<CalculationOutputs | null>(null);
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
        sx={(theme) => ({
          px: 4,
          width: "100%",
          maxWidth: "600px",
          borderRadius: "0px",
          "@media only screen and (min-width: 600px)": {
            borderRadius: "8px",
            my: 4,
          },

          py: 2,
        })}
        elevation={8}
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
          Flexim Meter Calculator
        </Typography>
        <Box>
          <Inputs
            outputSet={output !== null}
            onChange={() => {
              if (output) {
                setOutput(null);
              }
            }}
            loading={loading}
            onSubmit={async (inputData) => {
              setOutput(null);
              setLoading(true);
              const outputData = calculate(inputData);
              setTimeout(() => {
                setLoading(false);
                setOutput(outputData);
              }, 1000);
              return true;
            }}
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
      </Paper>
    </Box>
  );
};

export default Home;
