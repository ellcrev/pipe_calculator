import { DescriptionOutlined, FileDownload } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";

interface EmailButtonProps {
  saveCallback: () => Promise<string>;
}

const SaveButton = (props: EmailButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState("");
  return (
    <>
      <Button
        download={"Screenshot"}
        href={imageData}
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
          if (!imageData) {
            setLoading(true);
            setImageData(await props.saveCallback());
            setLoading(false);
          } else {
            setTimeout(() => {
              setImageData("");
            }, 50);
          }
        }}
        disabled={loading}
        fullWidth
      >
        {imageData ? (
          <FileDownload sx={{ mr: 2 }} />
        ) : (
          <DescriptionOutlined sx={{ mr: 2 }} />
        )}
        {imageData ? "Download" : "Generate Report"}
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

export default SaveButton;
