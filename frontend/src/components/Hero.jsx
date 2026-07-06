import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  DirectionsCar,
  EventAvailable,
  LocalParking,
  Security,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

import { useBooking } from "../context/BookingContext";

import parking from "../assets/parking.jpg";

function Hero() {
  const { stats } = useBooking();

  const cards = [
    {
      title: "Total Slots",
      value: stats.totalSlots,
      icon: <LocalParking sx={{ fontSize: 40 }} />,
      color: "#1976d2",
    },
    {
      title: "Available",
      value: stats.availableSlots,
      icon: <EventAvailable sx={{ fontSize: 40 }} />,
      color: "#2e7d32",
    },
    {
      title: "Bookings",
      value: stats.totalBookings,
      icon: <DirectionsCar sx={{ fontSize: 40 }} />,
      color: "#ef6c00",
    },
    {
      title: "Secure Parking",
      value: "24/7",
      icon: <Security sx={{ fontSize: 40 }} />,
      color: "#8e24aa",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${parking})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(rgba(0,0,0,.75),rgba(0,0,0,.75))",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Grid container spacing={5} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              variant="h2"
              color="white"
              fontWeight="bold"
            >
              Smart Parking
              <br />
              Made Simple
            </Typography>

            <Typography
              mt={3}
              color="#e0e0e0"
              fontSize={20}
              maxWidth={650}
            >
              Book your parking slot in seconds.
              View live availability, manage your
              bookings and enjoy a fast, secure
              parking experience.
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              mt={5}
            >
              <Button
                component={Link}
                to="/booking"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                }}
              >
                Book Parking
              </Button>

              <Button
                component={Link}
                to="/my-bookings"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  color: "white",
                  borderColor: "white",
                  borderRadius: 3,
                }}
              >
                My Bookings
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Grid container spacing={2}>
              {cards.map((card) => (
                <Grid
                  key={card.title}
                  size={{ xs: 6 }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      bgcolor: "rgba(255,255,255,.92)",
                      backdropFilter: "blur(8px)",
                      transition: ".3s",
                      "&:hover": {
                        transform:
                          "translateY(-6px)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          color: card.color,
                          mb: 1,
                        }}
                      >
                        {card.icon}
                      </Box>

                      <Typography
                        variant="h4"
                        fontWeight="bold"
                      >
                        {card.value}
                      </Typography>

                      <Typography
                        color="text.secondary"
                      >
                        {card.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;