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
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AppSnackbar from "../components/AppSnackbar";
import { useAuth } from "../context/AuthContext";

const API = "http://localhost:5000/api/auth";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `${API}/login`,
        form
      );

      login(res.data.user, res.data.token);

      setSnackbar({
        open: true,
        severity: "success",
        message: "Login Successful!",
      });

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          err.response?.data?.message ||
          "Login Failed",
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
            "linear-gradient(135deg,#1565c0,#42a5f5)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              borderRadius: 5,
              backdropFilter: "blur(10px)",
              bgcolor: "rgba(255,255,255,.95)",
              boxShadow: 10,
            }}
          >
            <CardContent sx={{ p: 5 }}>
              <Stack
                spacing={3}
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
                  Welcome Back
                </Typography>

                <Typography color="text.secondary">
                  Login to Smart Parking
                </Typography>
              </Stack>

              <Box
                component="form"
                mt={4}
                onSubmit={handleLogin}
              >
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
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
                    value={form.password}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
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

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.6,
                      borderRadius: 3,
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        size={25}
                        color="inherit"
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>

                  <Typography align="center">
                    Don't have an account?{" "}
                    <Link to="/register">
                      Register
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
        severity={snackbar.severity}
        message={snackbar.message}
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

export default LoginPage;