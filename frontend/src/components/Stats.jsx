import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  AccessTime,
  LocalParking,
  PhoneIphone,
  Security,
} from "@mui/icons-material";

const features = [
  {
    icon: <LocalParking sx={{ fontSize: 45 }} />,
    title: "Easy Slot Booking",
    desc: "Reserve your parking slot in just a few clicks without waiting.",
  },
  {
    icon: <AccessTime sx={{ fontSize: 45 }} />,
    title: "Real-Time Availability",
    desc: "Instantly check available parking slots.",
  },
  {
    icon: <Security sx={{ fontSize: 45 }} />,
    title: "Secure Parking",
    desc: "Safe parking with reliable booking management.",
  },
  {
    icon: <PhoneIphone sx={{ fontSize: 45 }} />,
    title: "Responsive Design",
    desc: "Works perfectly on desktop, tablet and mobile.",
  },
];

function Stats() {
  return (
    <Box
      sx={{
        py: 10,
        bgcolor: "#f8fafc",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight="bold"
          align="center"
          mb={2}
        >
          Why Choose Smart Parking?
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={{
            maxWidth: 700,
            mx: "auto",
            mb: 7,
          }}
        >
          Our system makes parking simple with live availability,
          instant booking, secure management and a responsive interface.
        </Typography>

        <Grid container spacing={4}>
          {features.map((item) => (
            <Grid
              key={item.title}
              size={{ xs: 12, sm: 6, md: 3 }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  height: "100%",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <Stack spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      bgcolor: "#1976d2",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography variant="h6" fontWeight="bold">
                    {item.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {item.desc}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Stats;