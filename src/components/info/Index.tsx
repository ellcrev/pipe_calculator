import { Box, Divider } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import AdditionalNotes from "./AdditionalNotes";
import IPAddress from "./IPAddress";
import LocationInput from "./LocationInput";
import MeterInput from "./MeterInput";

interface MeterInfoProps {
  isScreenshotting: boolean;

  meter: {
    letter: "H" | "C" | "S";
    setLetter: Dispatch<SetStateAction<"H" | "C" | "S">>;
    num1: string;
    setNum1: Dispatch<SetStateAction<string>>;
    num2: string;
    setNum2: Dispatch<SetStateAction<string>>;
    num3: string;
    setNum3: Dispatch<SetStateAction<string>>;
    num4: string;
    setNum4: Dispatch<SetStateAction<string>>;
  };
  ip: {
    num1: string;
    setNum1: Dispatch<SetStateAction<string>>;
    num2: string;
    setNum2: Dispatch<SetStateAction<string>>;
    num3: string;
    setNum3: Dispatch<SetStateAction<string>>;
    num4: string;
    setNum4: Dispatch<SetStateAction<string>>;
  };
  location: {
    lat: string;
    long: string;
  } | null;
  setLocation: Dispatch<
    SetStateAction<{
      lat: string;
      long: string;
    } | null>
  >;
  additionalInfo: string;
  setAdditionalInfo: Dispatch<SetStateAction<string>>;
}

const MeterInfo = (props: MeterInfoProps) => {
  return (
    <Box>
      <Divider
        sx={{ fontSize: "22px", fontWeight: "bold" }}
        data-html2canvas-ignore
      >
        Meter Information
      </Divider>
      <MeterInput {...props.meter} isScreenshotting={props.isScreenshotting} />
      <IPAddress {...props.ip} isScreenshotting={props.isScreenshotting} />
      <LocationInput
        location={props.location}
        setLocation={props.setLocation}
      />
      <AdditionalNotes
        text={props.additionalInfo}
        setText={props.setAdditionalInfo}
      />
    </Box>
  );
};

export default MeterInfo;
