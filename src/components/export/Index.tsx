import { Box, Divider } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import DownloadButton from "./DownloadButton";
import Email from "./Email";

export interface ExportProps {
  meterNum: string;
  screenshotContainer: HTMLDivElement | null;
  screenshotting: boolean;
  toggleScreenshotting: () => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  callEmail: () => void;
  loading: boolean;
  errorSendingEmail: string;
}

const Export = (props: ExportProps) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Divider
        sx={{ fontSize: "22px", fontWeight: "bold" }}
        data-html2canvas-ignore
      >
        Export Settings
      </Divider>
      <DownloadButton {...props} />
      <Divider> OR </Divider>

      <Email {...props} />
    </Box>
  );
};

export default Export;
