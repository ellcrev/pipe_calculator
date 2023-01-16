import { RestartAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

const LocationInput = () => {
  const [coords, setCoords] = useState<{ lat: string; long: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const getCoords = async () => {
    if (navigator.geolocation) {
      setGeoError(null);
      setLoading(true);
      if (process.env.NODE_ENV === "development") {
        setTimeout(() => {
          setCoords({
            lat: (41.40338).toString(),
            long: (2.17403).toString(),
          });
          setLoading(false);
        }, 3000);
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude.toString(),
            long: position.coords.longitude.toString(),
          });
          setLoading(false);
        },
        (err) => {
          if (err.PERMISSION_DENIED && process.env.NODE_ENV !== "development") {
            setGeoError("Location permission was denied by your browser.");
          } else if (err.POSITION_UNAVAILABLE) {
            setGeoError("Location permission could not be retrieved.");
          } else if (err.TIMEOUT) {
            setGeoError("Request for location timed out.");
          }
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        },
      );
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="subtitle2" fontSize={"16px"}>
          Location Info
        </Typography>
        {coords ? (
          <IconButton
            data-html2canvas-ignore
            color="error"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              setGeoError(null);
              setCoords(null);
              setLoading(false);
            }}
          >
            <RestartAlt />
          </IconButton>
        ) : null}
      </Box>

      {coords ? (
        <>
          <TableContainer
            sx={{ border: "1px solid black", borderRadius: "4px" }}
          >
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#e0e0e0",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bolder",
                      borderRight: "1px solid black",
                      borderBottom: "1px solid black",
                    }}
                  >
                    Latitude
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderRight: "1px solid transparent",
                      borderBottom: "1px solid black",
                      fontWeight: "bolder",
                    }}
                  >
                    Longitude
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{ borderRight: "1px solid black" }}
                    align="center"
                  >
                    120001230
                  </TableCell>
                  <TableCell align="center">324234234</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            sx={{ display: "block", py: 1.5 }}
            fullWidth
            disabled={loading}
            onClick={() => {
              getCoords();
            }}
            data-html2canvas-ignore
          >
            Get Location
            {loading ? (
              <CircularProgress
                sx={{ position: "absolute", right: "18px" }}
                size={"24px"}
              />
            ) : null}
          </Button>
          <Typography sx={{ mt: 1, color: "red", textAlign: "center" }}>
            {geoError}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default LocationInput;
