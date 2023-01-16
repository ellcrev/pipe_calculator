import { Box, Button, TextField, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useRef, useState } from "react";

interface IPAddressProps {
  isScreenshotting: boolean;
  num1: string;
  setNum1: Dispatch<SetStateAction<string>>;
  num2: string;
  setNum2: Dispatch<SetStateAction<string>>;
  num3: string;
  setNum3: Dispatch<SetStateAction<string>>;
  num4: string;
  setNum4: Dispatch<SetStateAction<string>>;
}

const IPAddress = (props: IPAddressProps) => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { num1, setNum1, num2, setNum2, num3, setNum3, num4, setNum4 } = props;
  const num1Ref = useRef<HTMLInputElement | null>(null);
  const num2Ref = useRef<HTMLInputElement | null>(null);
  const num3Ref = useRef<HTMLInputElement | null>(null);
  const num4Ref = useRef<HTMLInputElement | null>(null);

  const keydownHandler = (
    elem: HTMLInputElement,
    numStr: string,
    updateNumStr: (newString: string) => void,
    prevElem?: HTMLInputElement,
  ) => {
    const isCaret = elem.selectionStart === elem.selectionEnd;
    if (numStr.length === 0 && prevElem) {
      // Select previous.
      prevElem.focus();
    } else if (isCaret && typeof elem.selectionStart === "number") {
      const selNum = elem.selectionStart;
      // Splice the digit.
      const copiedStr = numStr.split("");
      copiedStr.splice(selNum - 1, 1);
      if (selNum < 3) {
        setTimeout(() => {
          elem.setSelectionRange((selNum ?? 1) - 1, (selNum ?? 1) - 1);
        }, 0);
      }
      updateNumStr(copiedStr.join(""));
    } else if (!isCaret) {
      // Delete selection
      const copiedStr = numStr.split("");
      const startSelNum = elem.selectionStart as number;
      const endSelNum = elem.selectionEnd as number;
      copiedStr.splice(startSelNum, endSelNum - startSelNum);
      updateNumStr(copiedStr.join(""));
      setTimeout(() => {
        elem.setSelectionRange(startSelNum ?? 0, startSelNum ?? 0);
      }, 0);
    }
  };

  const beforeInputHandler = (
    elem: HTMLInputElement,
    inputNumStr: string,
    numSrc: string,
    updateNumStr: (newString: string) => void,
    nextElem?: HTMLInputElement,
  ) => {
    const inputNum = parseInt(inputNumStr);

    if (digits.includes(inputNum)) {
      const isCaret = elem.selectionStart === elem.selectionEnd;

      const potentialNumStr = isCaret ? numSrc + inputNumStr : inputNumStr;
      const potentialNum = parseInt(potentialNumStr);

      // Determine if the potential number is valid
      const isValid =
        !isNaN(potentialNum) && potentialNum >= 0 && potentialNum < 256;
      if (isValid) {
        updateNumStr(potentialNumStr);
        // Determine if we should focus the next number
        if (
          nextElem &&
          ((potentialNumStr.length === 2 &&
            potentialNumStr[0] !== "0" &&
            potentialNumStr[0] !== "1" &&
            potentialNumStr[0] !== "2") ||
            potentialNumStr.length === 3)
        ) {
          nextElem.focus();
        }
      }
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle2" fontSize={"16px"}>
          IP Address
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
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Number 1 Input */}
        <TextField
          value={num1}
          type="tel"
          onKeyDown={(ev) => {
            if (ev.key === "Backspace" && num1Ref.current) {
              keydownHandler(num1Ref.current, num1, (newStr) => {
                setNum1(newStr);
              });
            }
          }}
          onSelect={() => {
            if (
              num1Ref.current?.selectionStart !== num1Ref.current?.selectionEnd
            ) {
              num1Ref.current?.setSelectionRange(0, 4);
            }
          }}
          onBeforeInput={(ev) => {
            const inputNumStr = (ev as any).data as string;
            if (num1Ref.current && num2Ref.current) {
              beforeInputHandler(
                num1Ref.current,
                inputNumStr,
                num1,
                (newStr) => {
                  setNum1(newStr);
                },
                num2Ref.current,
              );
            }
            ev.preventDefault();
          }}
          inputRef={num1Ref}
          variant="outlined"
          placeholder={props.isScreenshotting ? "" : "192"}
          inputProps={{
            sx: { fontSize: "16px", py: 1, px: 0, fontWeight: "bold" },
            style: {
              textAlign: "center",
            },
          }}
        />
        <Typography sx={{ fontSize: "32px", mx: 1 }}>.</Typography>
        {/* Number 2 Input */}
        <TextField
          type="tel"
          inputRef={num2Ref}
          variant="outlined"
          value={num2}
          onKeyDown={(ev) => {
            if (ev.key === "Backspace" && num2Ref.current && num1Ref.current) {
              keydownHandler(
                num2Ref.current,
                num2,
                (newStr) => {
                  setNum2(newStr);
                },
                num1Ref.current,
              );
            }
          }}
          onSelect={() => {
            if (
              num2Ref.current?.selectionStart !== num2Ref.current?.selectionEnd
            ) {
              num2Ref.current?.setSelectionRange(0, 4);
            }
          }}
          onBeforeInput={(ev) => {
            const inputNumStr = (ev as any).data as string;
            if (num2Ref.current && num3Ref.current) {
              beforeInputHandler(
                num2Ref.current,
                inputNumStr,
                num2,
                (newStr) => {
                  setNum2(newStr);
                },
                num3Ref.current,
              );
            }
            ev.preventDefault();
          }}
          placeholder={props.isScreenshotting ? "" : "168"}
          inputProps={{
            sx: { fontSize: "16px", py: 1, px: 0, fontWeight: "bold" },
            style: {
              textAlign: "center",
            },
          }}
        />
        <Typography sx={{ fontSize: "32px", mx: 1 }}>.</Typography>
        {/* Number 3 Input */}
        <TextField
          inputRef={num3Ref}
          variant="outlined"
          type="tel"
          value={num3}
          onKeyDown={(ev) => {
            if (ev.key === "Backspace" && num3Ref.current && num2Ref.current) {
              keydownHandler(
                num3Ref.current,
                num3,
                (newStr) => {
                  setNum3(newStr);
                },
                num2Ref.current,
              );
            }
          }}
          onSelect={() => {
            if (
              num3Ref.current?.selectionStart !== num3Ref.current?.selectionEnd
            ) {
              num3Ref.current?.setSelectionRange(0, 4);
            }
          }}
          onBeforeInput={(ev) => {
            const inputNumStr = (ev as any).data as string;
            if (num3Ref.current && num4Ref.current) {
              beforeInputHandler(
                num3Ref.current,
                inputNumStr,
                num3,
                (newStr) => {
                  setNum3(newStr);
                },
                num4Ref.current,
              );
            }
            ev.preventDefault();
          }}
          placeholder={props.isScreenshotting ? "" : "1"}
          inputProps={{
            sx: { fontSize: "16px", py: 1, px: 0, fontWeight: "bold" },
            style: {
              textAlign: "center",
            },
          }}
        />
        <Typography sx={{ fontSize: "32px", mx: 1 }}>.</Typography>
        {/* Number 4 Input */}
        <TextField
          inputRef={num4Ref}
          value={num4}
          type="tel"
          onKeyDown={(ev) => {
            if (ev.key === "Backspace" && num4Ref.current && num3Ref.current) {
              keydownHandler(
                num4Ref.current,
                num4,
                (newStr) => {
                  setNum4(newStr);
                },
                num3Ref.current,
              );
            }
          }}
          onSelect={() => {
            if (
              num4Ref.current?.selectionStart !== num4Ref.current?.selectionEnd
            ) {
              num4Ref.current?.setSelectionRange(0, 4);
            }
          }}
          onBeforeInput={(ev) => {
            const inputNumStr = (ev as any).data as string;
            if (num4Ref.current && num4Ref.current) {
              beforeInputHandler(
                num4Ref.current,
                inputNumStr,
                num4,
                (newStr) => {
                  setNum4(newStr);
                },
              );
            }
            ev.preventDefault();
          }}
          variant="outlined"
          placeholder={props.isScreenshotting ? "" : "1"}
          inputProps={{
            sx: { fontSize: "16px", py: 1, px: 0, fontWeight: "Bold" },
            style: {
              textAlign: "center",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default IPAddress;
