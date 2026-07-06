import {
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

function ParkingGrid({
  slots,
  selectedSlot,
  setSelectedSlot,
}) {
  const handleClick = (slot) => {
    if (slot.status === "occupied") return;

    setSelectedSlot(slot._id);
  };

  const rows = [];

  for (let i = 0; i < slots.length; i += 6) {
    rows.push(slots.slice(i, i + 6));
  }

  return (
    <Box>

      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        mb={4}
      >
        Parking Layout
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor: "#f5f7fb",
        }}
      >

        <Typography
          align="center"
          fontWeight="bold"
          color="primary"
          mb={4}
        >
          🚗 ENTRANCE
        </Typography>

        {rows.map((row, index) => (

          <Box key={index}>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
            >

              {row.map((slot) => {

                const occupied =
                  slot.status === "occupied";

                const selected =
                  selectedSlot === slot._id;

                return (

                  <Paper
                    key={slot._id}
                    onClick={() =>
                      handleClick(slot)
                    }
                    elevation={selected ? 8 : 2}
                    sx={{
                      width: 90,
                      height: 90,

                      borderRadius: 3,

                      cursor: occupied
                        ? "not-allowed"
                        : "pointer",

                      bgcolor: occupied
                        ? "#ef5350"
                        : selected
                        ? "#1976d2"
                        : "#43a047",

                      color: "white",

                      display: "flex",

                      flexDirection: "column",

                      justifyContent: "center",

                      alignItems: "center",

                      transition: ".25s",

                      "&:hover": {
                        transform: occupied
                          ? "none"
                          : "scale(1.08)",
                      },
                    }}
                  >

                    <DirectionsCarIcon />

                    <Typography
                      fontWeight="bold"
                    >
                      {slot.slotNumber}
                    </Typography>

                  </Paper>

                );

              })}

            </Stack>

            {index !== rows.length - 1 && (

              <Box
                sx={{
                  my: 3,

                  py: 1,

                  bgcolor: "#424242",

                  borderRadius: 2,
                }}
              >

                <Typography
                  align="center"
                  color="white"
                  fontWeight="bold"
                >
                  Driving Lane
                </Typography>

              </Box>

            )}

          </Box>

        ))}

      </Paper>

      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        mt={4}
      >

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Box
            sx={{
              width: 18,
              height: 18,
              bgcolor: "#43a047",
              borderRadius: 1,
            }}
          />

          <Typography>
            Available
          </Typography>

        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Box
            sx={{
              width: 18,
              height: 18,
              bgcolor: "#ef5350",
              borderRadius: 1,
            }}
          />

          <Typography>
            Occupied
          </Typography>

        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Box
            sx={{
              width: 18,
              height: 18,
              bgcolor: "#1976d2",
              borderRadius: 1,
            }}
          />

          <Typography>
            Selected
          </Typography>

        </Stack>

      </Stack>

    </Box>
  );
}

export default ParkingGrid;