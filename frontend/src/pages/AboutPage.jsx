import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from "@mui/material";

import {
  EmojiEvents,
  Groups,
  LocalParking,
  Security,
  Speed,
  Verified,
} from "@mui/icons-material";

const features = [
  {
    icon: <LocalParking sx={{ fontSize: 45 }} />,
    title: "Smart Booking",
    description:
      "Reserve your parking slot instantly with our easy-to-use booking system.",
  },
  {
    icon: <Speed sx={{ fontSize: 45 }} />,
    title: "Real-Time Updates",
    description:
      "Get live parking availability without refreshing the page.",
  },
  {
    icon: <Security sx={{ fontSize: 45 }} />,
    title: "Secure System",
    description:
      "Reliable booking management with safe and secure user authentication.",
  },
];

const stats = [
  {
    number: "100+",
    label: "Parking Slots",
  },
  {
    number: "1000+",
    label: "Bookings",
  },
  {
    number: "500+",
    label: "Happy Users",
  },
  {
    number: "24/7",
    label: "Support",
  },
];

function AboutPage() {
  return (
    <Box
      sx={{
        bgcolor: "#f5f7fb",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="lg">

        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          mb={2}
        >
          About Smart Parking
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={{
            maxWidth: 850,
            mx: "auto",
            mb: 8,
          }}
        >
          Smart Parking is a modern parking management system
          designed to simplify parking reservations. Our platform
          allows users to check real-time slot availability, book
          parking spaces instantly, and manage reservations through
          a clean, secure, and responsive interface.
        </Typography>

        <Grid container spacing={4} mb={8}>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
                height: "100%",
              }}
            >
              <EmojiEvents
                sx={{
                  fontSize: 60,
                  color: "#1976d2",
                }}
              />

              <Typography
                variant="h5"
                fontWeight="bold"
                mt={3}
                mb={2}
              >
                Our Mission
              </Typography>

              <Typography color="text.secondary">
                To provide a fast, secure, and hassle-free parking
                experience using modern web technologies.
              </Typography>

            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
                height: "100%",
              }}
            >
              <Verified
                sx={{
                  fontSize: 60,
                  color: "#1976d2",
                }}
              />

              <Typography
                variant="h5"
                fontWeight="bold"
                mt={3}
                mb={2}
              >
                Our Vision
              </Typography>

              <Typography color="text.secondary">
                To build smarter cities by making parking
                management efficient, digital, and user-friendly.
              </Typography>

            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
                height: "100%",
              }}
            >
              <Groups
                sx={{
                  fontSize: 60,
                  color: "#1976d2",
                }}
              />

              <Typography
                variant="h5"
                fontWeight="bold"
                mt={3}
                mb={2}
              >
                Our Team
              </Typography>

              <Typography color="text.secondary">
                Passionate developers committed to delivering a
                smooth, reliable and modern parking experience.
              </Typography>

            </Card>
          </Grid>

        </Grid>

        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          mb={5}
        >
          Why Choose Us
        </Typography>

        <Grid container spacing={4} mb={8}>

          {features.map((item) => (

            <Grid
              key={item.title}
              size={{ xs: 12, md: 4 }}
            >
              <Card
                sx={{
                  borderRadius: 4,
                  p: 4,
                  height: "100%",
                  textAlign: "center",
                  transition: ".3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    color: "#1976d2",
                    mb: 3,
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mb={2}
                >
                  {item.title}
                </Typography>

                <Typography color="text.secondary">
                  {item.description}
                </Typography>

              </Card>
            </Grid>

          ))}

        </Grid>

        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          mb={5}
        >
          Smart Parking in Numbers
        </Typography>

        <Grid container spacing={4}>

          {stats.map((item) => (

            <Grid
              key={item.label}
              size={{ xs: 6, md: 3 }}
            >
              <Card
                sx={{
                  borderRadius: 4,
                  p: 4,
                  textAlign: "center",
                  bgcolor: "#1976d2",
                  color: "white",
                }}
              >
                <CardContent>

                  <Typography
                    variant="h3"
                    fontWeight="bold"
                  >
                    {item.number}
                  </Typography>

                  <Typography>
                    {item.label}
                  </Typography>

                </CardContent>
              </Card>
            </Grid>

          ))}

        </Grid>

      </Container>
    </Box>
  );
}

export default AboutPage;