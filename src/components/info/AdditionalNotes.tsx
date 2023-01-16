import { Box, Button, TextareaAutosize, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useRef, useState } from "react";

interface AdditionalNotes {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

const AdditionalNotes = (props: AdditionalNotes) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [intialData, setInitialData] = useState(props.text);
  const elem = useRef<HTMLDivElement | null>(null);
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="subtitle2" fontSize={"16px"} sx={{ mb: 2 }}>
        Additional Notes
      </Typography>
      <div
        ref={elem}
        contentEditable
        suppressContentEditableWarning
        onInput={() => {
          if (elem.current) props.setText(elem.current.textContent ?? "");
        }}
        style={{
          border: "1px solid black",
          fontSize: "16px",
          padding: "16px",
          borderRadius: "4px",
          width: "100%",
          minHeight: "100px",
        }}
      ></div>
    </Box>
  );
};

export default AdditionalNotes;
