import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  AccountCircle,
  BookOnline,
  ContactMail,
  Dashboard,
  Home,
  Info,
  LocalParking,
  Login,
  Logout,
  Menu,
  PersonAdd,
} from "@mui/icons-material";

import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const navItems = [
    {
      title: "HOME",
      path: "/",
      icon: <Home />,
    },
    {
      title: "BOOK SLOT",
      path: "/booking",
      icon: <BookOnline />,
    },
    {
      title: "MY BOOKINGS",
      path: "/my-bookings",
      icon: <LocalParking />,
    },
    {
      title: "PROFILE",
      path: "/profile",
      icon: <AccountCircle />,
    },
    {
      title: "ABOUT",
      path: "/about",
      icon: <Info />,
    },
    {
      title: "CONTACT",
      path: "/contact",
      icon: <ContactMail />,
    },
  ];

  if (user?.role === "admin") {
    navItems.push({
      title: "ADMIN",
      path: "/admin",
      icon: <Dashboard />,
    });
  }

  const logoutUser = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          background: "#1f4fa3",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: 72,
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}

            <Stack
              component={Link}
              to="/"
              direction="row"
              spacing={1.2}
              alignItems="center"
              sx={{
                textDecoration: "none",
                color: "white",
                flexShrink: 0,
              }}
            >
              <LocalParking
                sx={{
                  fontSize: 40,
                  color: "#90caf9",
                }}
              />

              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                Smart Parking
              </Typography>
            </Stack>

            {/* Desktop Menu */}

            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
                flexGrow: 1,
                justifyContent: "center",
                mx: 3,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.title}
                  component={Link}
                  to={item.path}
                  disableElevation
                  sx={{
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                    fontSize: "0.9rem",

                    bgcolor:
                      location.pathname === item.path
                        ? "rgba(255,255,255,.16)"
                        : "transparent",

                    "&:hover": {
                      bgcolor:
                        "rgba(255,255,255,.14)",
                    },
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>

            {/* Desktop Right Side */}

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
                flexShrink: 0,
              }}
            >
              {!user ? (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    color="inherit"
                    startIcon={<Login />}
                  >
                    Login
                  </Button>

                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    startIcon={<PersonAdd />}
                    sx={{
                      bgcolor: "#42a5f5",
                      borderRadius: 3,
                      textTransform: "none",

                      "&:hover": {
                        bgcolor: "#1e88e5",
                      },
                    }}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <Tooltip title="Profile">
                    <Avatar
                      component={Link}
                      to="/profile"
                      sx={{
                        bgcolor: "#42a5f5",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>

                  <Box
                    sx={{
                      minWidth: 140,
                    }}
                  >
                    <Typography
                      fontWeight="bold"
                      fontSize={15}
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user.name}
                    </Typography>

                    <Typography
                      fontSize={12}
                      color="#dbeafe"
                    >
                      {user.role}
                    </Typography>
                  </Box>

                  <Button
                    color="inherit"
                    startIcon={<Logout />}
                    onClick={logoutUser}
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Stack>

            {/* Mobile Menu Button */}

            <IconButton
              color="inherit"
              onClick={() => setOpen(true)}
              sx={{
                display: {
                  xs: "flex",
                  lg: "none",
                },
              }}
            >
              <Menu />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
            {/* Mobile Drawer */}

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          {user && (
            <>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                mb={3}
              >
                <Avatar
                  component={Link}
                  to="/profile"
                  onClick={() => setOpen(false)}
                  sx={{
                    bgcolor: "#42a5f5",
                    width: 55,
                    height: 55,
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>

                <Box>
                  <Typography
                    fontWeight="bold"
                    fontSize={18}
                  >
                    {user.name}
                  </Typography>

                  <Typography
                    fontSize={13}
                    color="text.secondary"
                  >
                    {user.email}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ mb: 2 }} />
            </>
          )}

          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.title}
                disablePadding
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={
                    location.pathname === item.path
                  }
                  onClick={() => setOpen(false)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.title}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {!user ? (
            <Stack spacing={2}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                startIcon={<Login />}
                onClick={() => setOpen(false)}
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/register"
                variant="contained"
                startIcon={<PersonAdd />}
                onClick={() => setOpen(false)}
              >
                Register
              </Button>
            </Stack>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<Logout />}
              onClick={() => {
                logoutUser();
                setOpen(false);
              }}
            >
              Logout
            </Button>
          )}

          <Typography
            align="center"
            mt={5}
            color="text.secondary"
            fontSize={13}
          >
            © 2026 Smart Parking
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;