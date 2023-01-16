import { Button, CircularProgress } from "@mui/material";
import { CalculationInputs } from "../../types";

interface CalculateButtonProps {
  inputs: CalculationInputs;
  onSubmit?: (inputs: CalculationInputs) => void;
  loading: boolean;
}

const CalculateButton = (props: CalculateButtonProps) => {
  return (
    <Button
      variant="contained"
      sx={{ my: 2, py: 1.5, display: "flex", position: "relative" }}
      fullWidth
      onClick={() => {
        if (props.onSubmit && !props.loading) {
          props.onSubmit({
            ...props.inputs,
          });
        }
      }}
      disabled={!props.onSubmit || props.loading}
    >
      Calculate
      {props.loading ? (
        <CircularProgress
          sx={{ position: "absolute", right: "18px" }}
          size={"24px"}
        />
      ) : null}
    </Button>
  );
};

export default CalculateButton;
