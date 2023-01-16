import { Box, Button, TextareaAutosize, Typography } from "@mui/material";
import { useState } from "react";

const AdditionalNotes = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="subtitle2" fontSize={"16px"} sx={{ mb: 2 }}>
        Additional Notes
      </Typography>

      <div
        contentEditable
        suppressContentEditableWarning
        onBeforeInput={() => {}}
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
