import { Box, Typography } from "@mui/material";

interface NearestNominalProps {
  nominalSize: string;
}

const NearestNominal = (props: NearestNominalProps) => {
  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        Nearest Nominal Size
      </Typography>

      <Typography
        sx={{
          minWidth: "100px",
          textAlign: "center",
          border: "1px solid #00000044",
          backgroundColor: "lightgreen",
          fontWeight: "bold",
          ml: 2,
          p: 0.5,
          px: 2,
          borderRadius: "4px",
        }}
      >
        {props.nominalSize}
      </Typography>
    </Box>
  );
};

export default NearestNominal;
