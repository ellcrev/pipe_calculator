import { Button } from "@mui/material";

interface ResetButtonProps {
  reset: () => void;
}

const ResetButton = (props: ResetButtonProps) => {
  return (
    <Button
      variant="contained"
      color="error"
      sx={{ mx: "auto", display: "block", py: 1.5, mt: 4, mb: 4 }}
      fullWidth
      onClick={props.reset}
      data-html2canvas-ignore
    >
      Clear Output
    </Button>
  );
};

export default ResetButton;
