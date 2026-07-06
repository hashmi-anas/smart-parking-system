import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Email,
  LocalParking,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import AppSnackbar from "../components/AppSnackbar";

const API = "https://smart-parking-system-660j.onrender.com/api/auth";

function RegisterPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [snackbar, setSnackbar] =
    useState({
      open: false,
      severity: "success",
      message: "",
    });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      form.password !==
      form.confirmPassword
    ) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          "Passwords do not match",
      });

      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${API}/register`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );

      setSnackbar({
        open: true,
        severity: "success",
        message:
          "Registration Successful!",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          err.response?.data
            ?.message ||
          "Registration Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#0d47a1,#42a5f5)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              borderRadius: 5,
              bgcolor:
                "rgba(255,255,255,.95)",
              backdropFilter:
                "blur(12px)",
              boxShadow: 10,
            }}
          >
            <CardContent
              sx={{ p: 5 }}
            >
              <Stack
                spacing={2}
                alignItems="center"
              >
                <LocalParking
                  sx={{
                    fontSize: 70,
                    color: "#1565c0",
                  }}
                />

                <Typography
                  variant="h3"
                  fontWeight="bold"
                >
                  Create Account
                </Typography>

                <Typography color="text.secondary">
                  Join Smart Parking
                </Typography>
              </Stack>

              <Box
                component="form"
                mt={4}
                onSubmit={
                  handleRegister
                }
              >
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={
                      handleChange
                    }
                    InputProps={{
                      startAdornment:
                        (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={
                      handleChange
                    }
                    InputProps={{
                      startAdornment:
                        (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      form.password
                    }
                    onChange={
                      handleChange
                    }
                    InputProps={{
                      startAdornment:
                        (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        ),

                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowPassword(
                                !showPassword
                              )
                            }
                          >
                            {showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type={
                      showConfirm
                        ? "text"
                        : "password"
                    }
                    value={
                      form.confirmPassword
                    }
                    onChange={
                      handleChange
                    }
                    InputProps={{
                      startAdornment:
                        (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        ),

                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirm(
                                !showConfirm
                              )
                            }
                          >
                            {showConfirm ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={
                      loading
                    }
                    sx={{
                      py: 1.6,
                      borderRadius: 3,
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        size={24}
                        color="inherit"
                      />
                    ) : (
                      "Register"
                    )}
                  </Button>

                  <Typography align="center">
                    Already have an
                    account?{" "}
                    <Link to="/login">
                      Login
                    </Link>
                  </Typography>
                </Stack>
              </Box>
            </CardContent>
          </Card>
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

export default RegisterPage;