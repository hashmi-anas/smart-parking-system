import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Email,
  LocationOn,
  Phone,
  Send,
} from "@mui/icons-material";

import { useState } from "react";

import emailjs from "@emailjs/browser";

function ContactPage() {
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !form.from_name ||
      !form.from_email ||
      !form.subject ||
      !form.message
    ) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Please fill all fields.",
      });
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        "service_ebs5yl9",
        "template_8wcr869",
        form,
        "PRRPQq66RznLgr2qW"
      );

      setSnackbar({
        open: true,
        severity: "success",
        message: "Message sent successfully!",
      });

      setForm({
        from_name: "",
        from_email: "",
        subject: "",
        message: "",
      });
    }catch (error) {
  console.log("EmailJS Error:", error);

  setSnackbar({
    open: true,
    severity: "error",
    message: "Failed to send message.",
  });
}

    setLoading(false);
  };
    return (
    <>
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
            fontWeight="bold"
            align="center"
            mb={2}
          >
            Contact Us
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            mb={6}
          >
            We'd love to hear from you. Get in touch with us anytime.
          </Typography>

          <Grid container spacing={4} mb={6}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 4,
                  borderRadius: 4,
                  height: "100%",
                  transition: ".3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Phone
                  sx={{
                    fontSize: 50,
                    color: "#1976d2",
                  }}
                />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mt={2}
                >
                  Phone
                </Typography>

                <Typography color="text.secondary">
                  +91 7674910590
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 4,
                  borderRadius: 4,
                  height: "100%",
                  transition: ".3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Email
                  sx={{
                    fontSize: 50,
                    color: "#1976d2",
                  }}
                />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mt={2}
                >
                  Email
                </Typography>

                <Typography color="text.secondary">
                  hashmianas97@gmail.com
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 4,
                  borderRadius: 4,
                  height: "100%",
                  transition: ".3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <LocationOn
                  sx={{
                    fontSize: 50,
                    color: "#1976d2",
                  }}
                />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mt={2}
                >
                  Address
                </Typography>

                <Typography color="text.secondary">
                  Hitech City,
                  Madhapur,
                  Hyderabad,
                  Telangana
                </Typography>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ borderRadius: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={3}
                  >
                    Send us a Message
                  </Typography>

                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="from_name"
                      value={form.from_name}
                      onChange={handleChange}
                    />

                    <TextField
                      fullWidth
                      label="Email"
                      name="from_email"
                      value={form.from_email}
                      onChange={handleChange}
                    />

                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                    />

                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      label="Message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                    />

                    <Button
                      variant="contained"
                      size="large"
                      endIcon={
                        loading ? (
                          <CircularProgress
                            size={20}
                            color="inherit"
                          />
                        ) : (
                          <Send />
                        )
                      }
                      disabled={loading}
                      onClick={handleSubmit}
                      sx={{
                        py: 1.5,
                        borderRadius: 3,
                      }}
                    >
                      {loading
                        ? "Sending..."
                        : "Send Message"}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  height: "100%",
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <iframe
                    title="Google Map"
                    width="100%"
                    height="520"
                    style={{
                      border: 0,
                    }}
                    loading="lazy"
                    allowFullScreen
                    src="https://maps.google.com/maps?q=Hitech%20City%20Hyderabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box
  sx={{
    textAlign: "center",
    mt: 6,
    py: 2,
  }}
>
  <Typography
    variant="body2"
    color="text.secondary"
  >
    Developed with{" "}
    <span
      style={{
        color: "#e53935",
        fontSize: "18px",
      }}
    >
      ❤️
    </span>{" "}
    by{" "}
    <Typography
      component="span"
      sx={{
        fontWeight: "bold",
        color: "#1976d2",
      }}
    >
      Mohammed Anas Hashmi
    </Typography>
  </Typography>
</Box>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ContactPage;