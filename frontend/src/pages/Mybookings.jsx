import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  AccessTime,
  CalendarMonth,
  ConfirmationNumber,
  DirectionsCar,
  LocalParking,
} from "@mui/icons-material";

import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import generateReceipt from "../utils/generateReceipt";

function MyBookings() {
  const { user } = useAuth();

  const { bookings, slots, cancelBooking } = useBooking();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [search, setSearch] = useState("");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const getSlotNumber = (slotId) => {
    const slot = slots.find(
      (s) => String(s._id) === String(slotId)
    );

    return slot ? slot.slotNumber : slotId;
  };

  const handleCancelClick = (bookingId) => {
    setSelectedBooking(bookingId);
    setDialogOpen(true);
  };

  const confirmCancel = async () => {
    setLoading(true);

    await cancelBooking(selectedBooking);

    setLoading(false);
    setDialogOpen(false);
    setSnackbar(true);
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const text = search.toLowerCase();

      return (
        booking.bookingId.toLowerCase().includes(text) ||
        booking.vehicleNumber.toLowerCase().includes(text) ||
        getSlotNumber(booking.slotId)
          .toLowerCase()
          .includes(text)
      );
    });
  }, [bookings, search, slots]);

  return (
    <Box
      sx={{
        bgcolor: "#f5f7fb",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container maxWidth="lg">

        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          mb={1}
        >
          My Bookings
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={4}
        >
          View and manage all your parking reservations
        </Typography>

        <TextField
          fullWidth
          label="Search by Booking ID, Vehicle Number or Slot"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 4 }}
        />

        {bookings.length === 0 && (
          <Alert
            severity="info"
            sx={{
              borderRadius: 3,
              fontSize: 16,
            }}
          >
            You haven't booked any parking slots yet.
          </Alert>
        )}

        <Grid container spacing={4}>

          {filteredBookings.map((booking) => (

            <Grid
              key={booking._id}
              size={{ xs: 12, md: 6 }}
            >

              <Card
                sx={{
                  borderRadius: 5,
                  overflow: "hidden",
                  transition: ".3s",
                  boxShadow: 5,

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 12,
                  },
                }}
              >

                <Box
                  sx={{
                    background:
                      "linear-gradient(135deg,#1976d2,#42a5f5)",
                    color: "white",
                    p: 3,
                  }}
                >

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >

                      <Avatar
                        sx={{
                          bgcolor: "white",
                          color: "#1976d2",
                          width: 58,
                          height: 58,
                        }}
                      >
                        <DirectionsCar />
                      </Avatar>

                      <Box>

                        <Typography
                          variant="h6"
                          fontWeight="bold"
                        >
                          {booking.vehicleNumber}
                        </Typography>

                        <Typography>
                          Vehicle
                        </Typography>

                      </Box>

                    </Stack>

                    <Chip
                      label="Confirmed"
                      color="success"
                    />

                  </Stack>

                </Box>

                <CardContent sx={{ p: 3 }}>

                  <Stack spacing={2}>

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >

                      <LocalParking color="primary" />

                      <Typography>
                        <b>Slot:</b>{" "}
                        {getSlotNumber(booking.slotId)}
                      </Typography>

                    </Stack>

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >

                      <CalendarMonth color="primary" />

                      <Typography>
                        <b>Date:</b>{" "}
                        {booking.bookingDate}
                      </Typography>

                    </Stack>

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >

                      <AccessTime color="primary" />

                      <Typography>
                        <b>Time:</b>{" "}
                        {booking.entryTime} → {booking.exitTime}
                      </Typography>

                    </Stack>

                  </Stack>

                  <Divider sx={{ my: 3 }} />

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >

                    <ConfirmationNumber color="action" />

                    <Box>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Booking ID
                      </Typography>

                      <Typography fontWeight="bold">
                        {booking.bookingId}
                      </Typography>

                    </Box>

                  </Stack>
                                    <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 4 }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() =>
                        generateReceipt({
                          ...booking,
                          slotNumber: getSlotNumber(
                            booking.slotId
                          ),
                        })
                      }
                    >
                      Download Receipt
                    </Button>

                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      sx={{
                        borderRadius: 3,
                      }}
                      onClick={() =>
                        handleCancelClick(booking._id)
                      }
                    >
                      Cancel Booking
                    </Button>
                  </Stack>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        >
          <DialogTitle>
            Cancel Booking?
          </DialogTitle>

          <DialogContent>

            <DialogContentText>
              Are you sure you want to cancel this booking?

              This action cannot be undone.
            </DialogContentText>

          </DialogContent>

          <DialogActions>

            <Button
              onClick={() =>
                setDialogOpen(false)
              }
            >
              No
            </Button>

            <Button
              variant="contained"
              color="error"
              disabled={loading}
              onClick={confirmCancel}
            >
              {loading ? (
                <CircularProgress
                  size={22}
                  color="inherit"
                />
              ) : (
                "Yes, Cancel"
              )}
            </Button>

          </DialogActions>

        </Dialog>

        <Snackbar
          open={snackbar}
          autoHideDuration={3000}
          onClose={() => setSnackbar(false)}
        >
          <Alert
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Booking Cancelled Successfully
          </Alert>
        </Snackbar>

      </Container>

    </Box>
  );
}

export default MyBookings;