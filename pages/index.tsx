import { Box, Collapse, Paper, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRef, useState } from "react";
import { calculate } from "../src/calculate";
import Inputs from "../src/components/inputs/Index";
import Output from "../src/components/outputs/Index";
import Info from "../src/components/info/Index";
import Export from "../src/components/export/Index";
import {
  CalculationOutputs,
  LengthUnit,
  PipeScheduleName,
  TemperatureUnit,
} from "../src/types";
import getCurrentTime from "../src/converters/getCurrentTime";
import getScreenshot from "../src/getScreenshot";
import getNearestEstimatedAndDifference from "../src/converters/getNearestEstimatedAndDifference";
import tableLookup from "../src/tables/functions/tableLookup";

const Home: NextPage = () => {
  // Process State Variables
  const [calculating, setCalculating] = useState(false);
  const [screenshotting, setScreenshotting] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  // Input data
  const defaultCircumferenceUnits: LengthUnit = "in";
  const defaultThicknessUnits: LengthUnit = "in";
  const defaultTemperatureUnits: TemperatureUnit = "F";

  const [circumference, setCircumference] = useState("");
  const [circumferenceUnits, setCircumferenceUnits] = useState<LengthUnit>(
    defaultCircumferenceUnits,
  );
  const [thickness, setThickness] = useState("");
  const [thicknessUnits, setThicknessUnits] = useState<LengthUnit>(
    defaultThicknessUnits,
  );
  const [temperature, setTemperature] = useState("");
  const [temperatureUnits, setTemperatureUnits] = useState<TemperatureUnit>(
    defaultTemperatureUnits,
  );
  const [pipeSchedule, setPipeSchedule] =
    useState<PipeScheduleName>("stainless-steel");

  // Output data
  const [output, setOutput] = useState<CalculationOutputs | null>(null);
  const [ODSystem, setODSystem] = useState<"SI" | "IMP">("IMP");
  const [WTSystem, setWTSystem] = useState<"SI" | "IMP">("IMP");
  const [speedSystem, setSpeedSystem] = useState<"SI" | "IMP">("IMP");

  // Info data
  const [meterLetter, setMeterLetter] = useState<"H" | "C" | "S">("H");
  const [meterNum1, setMeterNum1] = useState("");
  const [meterNum2, setMeterNum2] = useState("");
  const [meterNum3, setMeterNum3] = useState("");
  const [meterNum4, setMeterNum4] = useState("");
  const [ip1, setIp1] = useState("");
  const [ip2, setIp2] = useState("");
  const [ip3, setIp3] = useState("");
  const [ip4, setIp4] = useState("");
  const [location, setLocation] = useState<{
    lat: string;
    long: string;
  } | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  // Export data
  const [email, setEmail] = useState<string>("");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const order = screenshotting
    ? ["info", "inputs", "output"]
    : ["inputs", "output", "info", "export"];

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
          {screenshotting ? "Meter Report" : "Flexim Meter Logger"}
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
            // INPUT SECTION
            if (orderItem === "inputs") {
              return (
                <Inputs
                  key={orderItem}
                  clearOutput={() => {
                    if (output) {
                      setOutput(null);
                    }
                  }}
                  screenshotting={screenshotting}
                  loading={calculating}
                  onSubmit={
                    !output
                      ? async (inputData) => {
                          setOutput(null);
                          setCalculating(true);
                          const outputData = calculate(inputData);
                          setTimeout(() => {
                            setCalculating(false);
                            setOutput(outputData);
                          }, 1000);
                          return true;
                        }
                      : undefined
                  }
                  circumference={circumference}
                  setCircumference={setCircumference}
                  circumferenceUnits={circumferenceUnits}
                  setCircumferenceUnits={setCircumferenceUnits}
                  defaultCircumferenceUnits={defaultCircumferenceUnits}
                  thickness={thickness}
                  setThickness={setThickness}
                  thicknessUnits={thicknessUnits}
                  setThicknessUnits={setThicknessUnits}
                  defaultThicknessUnits={defaultThicknessUnits}
                  temperature={temperature}
                  setTemperature={setTemperature}
                  temperatureUnits={temperatureUnits}
                  setTemperatureUnits={setTemperatureUnits}
                  defaultTemperatureUnits={defaultTemperatureUnits}
                  pipeSchedule={pipeSchedule}
                  setPipeSchedule={setPipeSchedule}
                />
              );
              // OUTPUT SECTION
            } else if (orderItem === "output") {
              return (
                <Collapse in={output !== null} key={orderItem}>
                  <Box>
                    {output !== null ? (
                      <Output
                        screenshotting={screenshotting}
                        ODSystem={ODSystem}
                        setODSystem={setODSystem}
                        WTSystem={WTSystem}
                        setWTSystem={setWTSystem}
                        speedSystem={speedSystem}
                        setSpeedSystem={setSpeedSystem}
                        {...output}
                        reset={() => {
                          setOutput(null);
                        }}
                      />
                    ) : null}
                  </Box>
                </Collapse>
              );
            } else if (orderItem === "info") {
              return (
                <Collapse in={output !== null} key={orderItem}>
                  <Info
                    isScreenshotting={screenshotting}
                    meter={{
                      letter: meterLetter,
                      setLetter: setMeterLetter,
                      num1: meterNum1,
                      setNum1: setMeterNum1,
                      num2: meterNum2,
                      setNum2: setMeterNum2,
                      num3: meterNum3,
                      setNum3: setMeterNum3,
                      num4: meterNum4,
                      setNum4: setMeterNum4,
                    }}
                    ip={{
                      num1: ip1,
                      setNum1: setIp1,
                      num2: ip2,
                      setNum2: setIp2,
                      num3: ip3,
                      setNum3: setIp3,
                      num4: ip4,
                      setNum4: setIp4,
                    }}
                    location={location}
                    setLocation={setLocation}
                    additionalInfo={additionalInfo}
                    setAdditionalInfo={setAdditionalInfo}
                  />
                </Collapse>
              );
            } else {
              // EXPORT
              return (
                <Collapse in={output !== null} key={orderItem}>
                  <Export
                    meterNum={
                      meterLetter +
                      "-" +
                      meterNum1 +
                      meterNum2 +
                      meterNum3 +
                      meterNum4
                    }
                    screenshotContainer={containerRef.current}
                    screenshotting={screenshotting}
                    toggleScreenshotting={() => {
                      setScreenshotting((st) => !st);
                    }}
                    email={email}
                    setEmail={setEmail}
                    callEmail={async () => {
                      if (containerRef.current && output) {
                        setLoadingEmail(true);
                        const b = await getScreenshot(
                          containerRef.current,
                          () => {
                            setScreenshotting((st) => !st);
                          },
                        );
                        const res = await (
                          await fetch(window.location.origin + "/api/email", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              imageURL: b.outputStr,
                              report: {
                                email: email,
                                info: {
                                  time: getCurrentTime(),
                                  meter_number:
                                    meterLetter +
                                    " - " +
                                    meterNum1 +
                                    meterNum2 +
                                    meterNum3 +
                                    meterNum4,
                                  ip_address:
                                    ip1 + "." + ip2 + "." + ip3 + "." + ip4,
                                  location: {
                                    latitude: location?.lat ?? "N/A",
                                    longitude: location?.long ?? "N/A",
                                  },
                                  additional_notes: additionalInfo,
                                },
                                inputs: {
                                  circumference:
                                    circumference + " " + circumferenceUnits,
                                  thickness: thickness + " " + thicknessUnits,
                                  temperature:
                                    temperature + " °" + temperatureUnits,
                                  schedule: tableLookup(pipeSchedule).title,
                                },
                                outputs: {
                                  nominal_size:
                                    output.wallThickness.table.values[
                                      output.wallThickness.nearestIndex
                                    ].nominalSize + " in",
                                  outer_diameter:
                                    getNearestEstimatedAndDifference(
                                      output.outerDiameterMillimeters,
                                      output.wallThickness.table.values[
                                        output.wallThickness.nearestIndex
                                      ].outerDiameterInMM,
                                      ODSystem === "IMP" ? "in" : "mm",
                                    ),
                                  wall_thickness:
                                    getNearestEstimatedAndDifference(
                                      output.wallThickness
                                        .interpolatedValueMillimeters,
                                      output.wallThickness.table.values[
                                        output.wallThickness.nearestIndex
                                      ].wallThicknessInMM,
                                      WTSystem === "IMP" ? "in" : "mm",
                                    ),
                                  speed_of_sound:
                                    getNearestEstimatedAndDifference(
                                      output.soundSpeed
                                        .interpolatedValueMetersPerSecond,
                                      output.soundSpeed.table.values[
                                        output.soundSpeed.nearestIndex
                                      ].speedOfSoundInMetersPerSecond,
                                      speedSystem === "IMP" ? "ft/s" : "m/s",
                                    ),
                                },
                              },
                            }),
                          })
                        ).json();
                        if (res.operation === "Success") {
                          setEmailMessage("Email was successfully sent.");
                        } else if (res.operation === "Failure") {
                          setEmailMessage("Error sending email.");
                        }
                        setTimeout(() => {
                          setEmailMessage("");
                        }, 3000);
                        setLoadingEmail(false);
                      }
                    }}
                    loading={loadingEmail}
                    errorSendingEmail={emailMessage}
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
