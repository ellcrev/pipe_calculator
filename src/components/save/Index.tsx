import { Box, Divider } from "@mui/material";
import AdditionalNotes from "./AdditionalNotes";
import IPAddress from "./IPAddress";
import LocationInput from "./LocationInput";
import MeterInput from "./MeterInput";

const SaveSettings = () => {
  return (
    <Box>
      <Divider
        sx={{ fontSize: "22px", fontWeight: "bold" }}
        data-html2canvas-ignore
      >
        Save Report
      </Divider>
      <MeterInput />
      <IPAddress />
      <LocationInput />
      <AdditionalNotes />
    </Box>
  );
};

export default SaveSettings;
