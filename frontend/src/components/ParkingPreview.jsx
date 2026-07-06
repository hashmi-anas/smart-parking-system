import { Box, Container, Grid, Paper, Typography } from "@mui/material";

const slots = ["A1", "A2", "A3", "B1", "B2", "C1"];

export default function ParkingPreview() {
  return (
    <Box sx={{ py: 6, bgcolor: "#f5f5f5" }}>
      <Container>
        <Typography variant="h4" textAlign="center" mb={4}>
          Live Parking Slots
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {slots.map((s) => (
            <Grid key={s}>
              <Paper
                sx={{
                  width: 90,
                  height: 90,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#4caf50",
                  color: "white",
                }}
              >
                {s}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}