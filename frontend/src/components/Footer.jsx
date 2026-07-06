import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import {
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  LocalParking,
  LocationOn,
  Phone,
  Twitter,
} from "@mui/icons-material";

function Footer() {
  return (
    <Box
      sx={{
        mt: 8,
        bgcolor: "#0f172a",
        color: "white",
        pt: 8,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Logo */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mb={2}
            >
              <LocalParking
                sx={{
                  fontSize: 42,
                  color: "#42a5f5",
                }}
              />

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                Smart Parking
              </Typography>
            </Stack>

            <Typography color="#cbd5e1">
              Book your parking slot instantly with
              real-time availability and secure booking.
              Smart Parking makes parking faster, safer,
              and more convenient.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
            >
              Quick Links
            </Typography>

            <Stack spacing={1}>
              <Link
                href="/"
                underline="hover"
                color="inherit"
              >
                Home
              </Link>

              <Link
                href="/booking"
                underline="hover"
                color="inherit"
              >
                Book Slot
              </Link>

              <Link
                href="/my-bookings"
                underline="hover"
                color="inherit"
              >
                My Bookings
              </Link>

              <Link
                href="/about"
                underline="hover"
                color="inherit"
              >
                About
              </Link>

              <Link
                href="/contact"
                underline="hover"
                color="inherit"
              >
                Contact
              </Link>
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
            >
              Contact
            </Typography>

            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Email
                  sx={{
                    color: "#42a5f5",
                    fontSize: 20,
                  }}
                />
                <Typography color="#cbd5e1">
                  hashmianas97@gmail.com
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Phone
                  sx={{
                    color: "#42a5f5",
                    fontSize: 20,
                  }}
                />
                <Typography color="#cbd5e1">
                  +91 7674910590
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="flex-start"
              >
                <LocationOn
                  sx={{
                    color: "#42a5f5",
                    fontSize: 20,
                    mt: 0.3,
                  }}
                />
                <Typography color="#cbd5e1">
                  Hitech City,
                  Madhapur,
                  Hyderabad
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* Social */}
<Grid size={{ xs: 12, sm: 6, md: 3 }}>
  <Typography
    variant="h6"
    fontWeight="bold"
    mb={2}
  >
    Follow Me
  </Typography>

  <Stack direction="row" spacing={1}>

    {/* Facebook */}
    

    {/* Instagram */}
    <IconButton
      component="a"
      href="https://instagram.com/errrorrr97"
      target="_blank"
      rel="noopener noreferrer"
      color="inherit"
      sx={{
        "&:hover": {
          color: "#E1306C",
        },
      }}
    >
      <Instagram />
    </IconButton>

    {/* Twitter / X */}
    <IconButton
      component="a"
      href="https://twitter.com/@MDANAS_97"
      target="_blank"
      rel="noopener noreferrer"
      color="inherit"
      sx={{
        "&:hover": {
          color: "#1DA1F2",
        },
      }}
    >
      <Twitter />
    </IconButton>

    {/* LinkedIn */}
    <IconButton
      component="a"
      href="https://linkedin.com/in/anas--hashmi"
      target="_blank"
      rel="noopener noreferrer"
      color="inherit"
      sx={{
        "&:hover": {
          color: "#0A66C2",
        },
      }}
    >
      <LinkedIn />
    </IconButton>

  </Stack>

  <Typography
    mt={2}
    color="#94a3b8"
    fontSize={14}
  >
    Connect with me for project updates and collaborations.
  </Typography>
</Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
            borderColor: "#334155",
          }}
        />

        <Typography
          align="center"
          color="#94a3b8"
        >
          © 2026 Smart Parking System | Developed by
          Anas Hashmi | All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;