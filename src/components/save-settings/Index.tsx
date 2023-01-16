import { Box, Divider } from "@mui/material";
import AdditionalNotes from "./AdditionalNotes";
import IPAddress from "./IPAddress";
import LocationInput from "./LocationInput";
import MeterInput from "./MeterInput";

interface SaveSettingsProps {
  isScreenshotting: boolean;
}

const SaveSettings = (props: SaveSettingsProps) => {
  return (
    <Box>
      <Divider
        sx={{ fontSize: "22px", fontWeight: "bold" }}
        data-html2canvas-ignore
      >
        Save Report
      </Divider>
      <MeterInput isScreenshotting={props.isScreenshotting} />
      <IPAddress isScreenshotting={props.isScreenshotting} />
      <LocationInput />
      <AdditionalNotes />
    </Box>
  );
};

export default SaveSettings;
