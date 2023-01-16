import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";

interface EmailButtonProps {
  saveCallback: () => Promise<true>;
}

const SaveButton = (props: EmailButtonProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        data-html2canvas-ignore
        variant="contained"
        color="primary"
        sx={{ mx: "auto", display: "block", py: 1.5, my: 4 }}
        onClick={async () => {
          setLoading(true);
          await props.saveCallback();
          setLoading(false);
        }}
        disabled={loading}
        fullWidth
      >
        Save Report
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
