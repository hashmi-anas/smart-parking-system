import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { Navigate } from "react-router-dom";

import AppSnackbar from "../components/AppSnackbar";
import ParkingGrid from "../components/ParkingGrid";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

function BookingPage() {
  const { user } = useAuth();
  const { slots, bookSlot } = useBooking();

  const [selectedSlot, setSelectedSlot] = useState("");

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    vehicleNumber: "",
    bookingDate: "",
    entryTime: "",
    exitTime: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const selectedSlotData = slots.find(
    (slot) => slot._id === selectedSlot
  );

  const availableSlots = slots.filter(
    (s) => s.status === "available"
  ).length;

  const occupiedSlots =
    slots.length - availableSlots;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async () => {
    if (!selectedSlot) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          "Please select a parking slot.",
      });

      return;
    }

    if (
      !form.vehicleNumber ||
      !form.bookingDate ||
      !form.entryTime ||
      !form.exitTime
    ) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          "Please fill all fields.",
      });

      return;
    }

    setLoading(true);

    try {
      const booking = await bookSlot({
        userId: user._id,
        userName: user.name,
        email: user.email,
        slotId: selectedSlot,
        vehicleNumber: form.vehicleNumber,
        bookingDate: form.bookingDate,
        entryTime: form.entryTime,
        exitTime: form.exitTime,
      });

      if (booking) {
        setSnackbar({
          open: true,
          severity: "success",
          message: `Booking Successful! Booking ID: ${booking.bookingId}`,
        });

        setSelectedSlot("");

        setForm({
          vehicleNumber: "",
          bookingDate: "",
          entryTime: "",
          exitTime: "",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          "Booking Failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#f5f7fb",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Container maxWidth="xl">

          <Box textAlign="center" mb={4}>
            <Typography
              variant="h3"
              fontWeight="bold"
            >
              Book Your Parking Slot
            </Typography>

            <Typography
              color="text.secondary"
              mt={1}
            >
              Select a slot and complete
              your booking in seconds
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            mb={3}
            flexWrap="wrap"
          >
            <Chip
              icon={<DirectionsCarIcon />}
              label={`Available: ${availableSlots}`}
              color="success"
            />

            <Chip
              icon={<DirectionsCarIcon />}
              label={`Occupied: ${occupiedSlots}`}
              color="error"
            />

            <Chip
              icon={<DirectionsCarIcon />}
              label={`Total: ${slots.length}`}
              color="primary"
            />
          </Stack>

          <Grid container spacing={3}>

            <Grid size={{ xs: 12, md: 7 }}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: 3,
                }}
              >
                <ParkingGrid
                  slots={slots}
                  selectedSlot={
                    selectedSlot
                  }
                  setSelectedSlot={
                    setSelectedSlot
                  }
                />
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: 3,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  mb={2}
                >
                  Booking Details
                </Typography>

                <TextField
                  fullWidth
                  label="Vehicle Number"
                  name="vehicleNumber"
                  value={
                    form.vehicleNumber
                  }
                  onChange={
                    handleChange
                  }
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  type="date"
                  name="bookingDate"
                  value={
                    form.bookingDate
                  }
                  onChange={
                    handleChange
                  }
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  fullWidth
                  type="time"
                  name="entryTime"
                  value={
                    form.entryTime
                  }
                  onChange={
                    handleChange
                  }
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  fullWidth
                  type="time"
                  name="exitTime"
                  value={
                    form.exitTime
                  }
                  onChange={
                    handleChange
                  }
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <Box
                  mt={2}
                  p={2}
                  bgcolor="#f0f4ff"
                  borderRadius={2}
                >
                  <Typography fontWeight="bold">
                    Logged in User
                  </Typography>

                  <Typography>
                    {user.name}
                  </Typography>

                  <Typography color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>

                <Box mt={2}>
                  <Typography fontWeight="bold">
                    Selected Slot
                  </Typography>

                  <Typography
                    color={
                      selectedSlotData
                        ? "primary"
                        : "error"
                    }
                  >
                    {selectedSlotData
                      ? selectedSlotData.slotNumber
                      : "No slot selected"}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 3,
                  }}
                  onClick={
                    handleBooking
                  }
                >
                  {loading ? (
                    <CircularProgress
                      size={24}
                      color="inherit"
                    />
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </Box>

      <AppSnackbar
        open={snackbar.open}
        severity={
          snackbar.severity
        }
        message={
          snackbar.message
        }
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      />
    </>
  );
}

export default BookingPage;