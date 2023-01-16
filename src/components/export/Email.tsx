import { Email as EmailIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface EmailProps {
  screenshotContainer: HTMLDivElement | null;
  screenshotting: boolean;
  toggleScreenshotting: () => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  callEmail: () => void;
  loading: boolean;
  errorSendingEmail: string;
}

const Email = (props: EmailProps) => {
  const fullEmail = props.email + "@stanford.edu";
  const emailErr =
    props.email.length !== 0 &&
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fullEmail);

  return (
    <>
      <TextField
        sx={{ mt: 4 }}
        fullWidth
        onChange={(ev) => {
          props.setEmail(ev.target.value);
        }}
        error={emailErr}
        helperText={emailErr ? "Invalid email format." : undefined}
        inputProps={{
          style: {
            fontSize: "20px",
            textAlign: "center",
            fontWeight: "bold",
          },
        }}
        label={<Typography sx={{ fontSize: "20px" }}>Email Address</Typography>}
        InputProps={{
          endAdornment: (
            <Box
              sx={{
                height: "100%",
                marginRight: "-13px",
                padding: "8px 16px",
                marginLeft: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  userSelect: "none",
                  color: "#505050",
                }}
              >
                @stanford.edu
              </Typography>
            </Box>
          ),
        }}
      />

      <Button
        data-html2canvas-ignore
        variant="contained"
        color="success"
        sx={{
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 1.5,
          my: 4,
          textAlign: "center",
        }}
        onClick={() => {
          props.callEmail();
        }}
        disabled={
          props.loading ||
          emailErr ||
          !props.email ||
          props.errorSendingEmail.length !== 0
        }
        fullWidth
      >
        <EmailIcon sx={{ mr: 2 }} />
        Email
        {props.loading ? (
          <CircularProgress
            sx={{ position: "absolute", right: "18px" }}
            size={"24px"}
          />
        ) : null}
      </Button>
      {props.errorSendingEmail ? (
        <Typography
          sx={{ textAlign: "center", mt: -2, mb: 4, fontWeight: "bold" }}
          data-html2canvas-ignore
        >
          {props.errorSendingEmail}
        </Typography>
      ) : null}
    </>
  );
};

export default Email;
