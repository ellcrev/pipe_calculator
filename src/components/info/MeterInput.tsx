import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useRef, useState } from "react";

interface MeterInputProps {
  isScreenshotting: boolean;
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
}

const MeterInput = (props: MeterInputProps) => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const {
    letter,
    setLetter,
    num1,
    setNum1,
    num2,
    setNum2,
    num3,
    setNum3,
    num4,
    setNum4,
  } = props;

  const num1Ref = useRef<HTMLInputElement | null>(null);
  const num2Ref = useRef<HTMLInputElement | null>(null);
  const num3Ref = useRef<HTMLInputElement | null>(null);
  const num4Ref = useRef<HTMLInputElement | null>(null);
  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          fontSize={"20px"}
          fontWeight={"bold"}
          sx={{ mt: 2 }}
        >
          Meter
        </Typography>
        {num1 || num2 || num3 || num4 ? (
          <Button
            data-html2canvas-ignore
            onClick={() => {
              setNum1("");
              setNum2("");
              setNum3("");
              setNum4("");
              num1Ref.current?.focus();
            }}
          >
            Clear
          </Button>
        ) : null}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Letter Input */}
        <Select
          inputProps={{
            sx: {
              py: 1.2,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
            },
          }}
          defaultValue={"H"}
          onChange={(ev) => {
            if (ev.target.value) {
              setLetter(ev.target.value as "H" | "C" | "S");
            }
          }}
        >
          <MenuItem value="H">H</MenuItem>
          <MenuItem value="C">C</MenuItem>
          <MenuItem value="S">S</MenuItem>
        </Select>
        <Typography sx={{ fontSize: "62px", mx: 1, color: "#505050" }}>
          -
        </Typography>
        {/* Number 1 Input */}
        <TextField
          type="tel"
          value={num1}
          onKeyDown={(ev) => {
            if (ev.key === "Backspace") {
              if (num1) {
                setNum1("");
              }
            }
          }}
          onBeforeInput={(ev) => {
            const strNum = (ev as any).data as string;
            const num = parseInt(strNum);
            if (!isNaN(num) && digits.includes(num)) {
              setNum1(num.toString());
              num2Ref.current?.focus();
            }
            ev.preventDefault();
          }}
          inputRef={num1Ref}
          variant="outlined"
          sx={{ width: "50px", mx: 1 }}
          placeholder={props.isScreenshotting ? "" : "1"}
          inputProps={{
            sx: { fontSize: "20px", py: 1, px: 0, fontWeight: "bold" },
            style: {
              textAlign: "center",
            },
          }}
        />
        {/* Number 2 Input */}
        <TextField
          type="tel"
          inputRef={num2Ref}
          variant="outlined"
          value={num2}
          onKeyDown={(ev) => {
            if (ev.key === "Backspace") {
              if (num2) {
                setNum2("");
              } else {
                num1Ref.current?.focus();
              }
            }
          }}
          onBeforeInput={(ev) => {
            const strNum = (ev as any).data as string;
            const num = parseInt(strNum);
            if (!isNaN(num) && digits.includes(num)) {
              setNum2(num.toString());
              num3Ref.current?.focus();
            }
            ev.preventDefault();
          }}
          sx={{ width: "50px", mx: 1 }}
          placeholder={props.isScreenshotting ? "" : "5"}
          inputProps={{
            sx: { fontSize: "20px", py: 1, px: 0, fontWeight: "bold" },
            style: {
              textAlign: "center",

              appearance: "none",
              WebkitAppearance: "none",
            },
          }}
        />
        {/* Number 3 Input */}
        <TextField
          type="tel"
          inputRef={num3Ref}
          variant="outlined"
          value={num3}
          onKeyDown={(ev) => {
            if (ev.key === "Backspace") {
              if (num3) {
                setNum3("");
              } else {
                num2Ref.current?.focus();
              }
            }
          }}
          onBeforeInput={(ev) => {
            const strNum = (ev as any).data as string;
            const num = parseInt(strNum);
            if (!isNaN(num) && digits.includes(num)) {
              setNum3(num.toString());
              num4Ref.current?.focus();
            }
            ev.preventDefault();
          }}
          sx={{ width: "50px", mx: 1 }}
          placeholder={props.isScreenshotting ? "" : "3"}
          inputProps={{
            sx: { fontSize: "20px", py: 1, px: 0, fontWeight: "bold" },
            style: {
              textAlign: "center",
            },
          }}
        />
        {/* Number 4 Input */}
        <TextField
          type="tel"
          inputRef={num4Ref}
          value={num4}
          onKeyDown={(ev) => {
            if (ev.key === "Backspace") {
              if (num4) {
                setNum4("");
              } else {
                num3Ref.current?.focus();
              }
            }
          }}
          onBeforeInput={(ev) => {
            const strNum = (ev as any).data as string;
            const num = parseInt(strNum);
            if (!isNaN(num) && digits.includes(num)) {
              setNum4(num.toString());
            }
            ev.preventDefault();
          }}
          variant="outlined"
          sx={{ width: "50px", mx: 1 }}
          placeholder={props.isScreenshotting ? "" : "8"}
          inputProps={{
            sx: { fontSize: "20px", py: 1, px: 0, fontWeight: "Bold" },
            style: {
              textAlign: "center",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default MeterInput;
