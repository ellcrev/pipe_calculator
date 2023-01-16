import { FileDownload } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import getScreenshot from "../../getScreenshot";

interface DownloadButtonProps {
  screenshotContainer: HTMLDivElement | null;
  screenshotting: boolean;
  toggleScreenshotting: () => void;
}

const DownloadButton = (props: DownloadButtonProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        data-html2canvas-ignore
        variant="contained"
        color="primary"
        sx={{
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 1.5,
          my: 4,
          textAlign: "center",
        }}
        onClick={async () => {
          if (props.screenshotContainer) {
            setLoading(true);
            const b = await getScreenshot(
              props.screenshotContainer,
              props.toggleScreenshotting,
            );
            if (b) {
              const url = window.URL.createObjectURL(b);
              const fakeLink = document.createElement("a");
              fakeLink.href = url;
              fakeLink.download = "Screenshot";
              fakeLink.click();
            }
            setLoading(false);
          }

          // Get the blob
        }}
        disabled={loading}
        fullWidth
      >
        <FileDownload sx={{ mr: 2 }} />
        Download Report
        {loading ? (
          <CircularProgress
            sx={{ position: "absolute", right: "18px" }}
            size={"24px"}
          />
        ) : null}
      </Button>
    </>
  );
};

export default DownloadButton;
