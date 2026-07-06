import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  CheckCircle,
  Email,
  LocalParking,
  Person,
} from "@mui/icons-material";

import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import EditProfileDialog from "./EditProfileDialog";

function ProfilePage() {
  const { user, updateUser } = useAuth();

  const { bookings } = useBooking();

  const [open, setOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const totalBookings = bookings.filter(
    (booking) => booking.userId === user._id
  ).length;

  const handleSave = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://smart-parking-system-660j.onrender.com/api/auth/update/${user._id}`
        ,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (res.ok) {
        updateUser(result.user);

        alert("Profile Updated Successfully");

        setOpen(false);
      } else {
        alert(result.message);
      }
    } 
    catch (err) {
  console.log(err);
  alert(err.message);
}
  };

  return (
        <Box
      sx={{
        bgcolor: "#f5f7fb",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            boxShadow: 6,
          }}
        >
          <Box
            sx={{
              background:
                "linear-gradient(135deg,#1565C0,#42A5F5)",
              py: 5,
              textAlign: "center",
              color: "white",
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                bgcolor: "white",
                color: "#1565C0",
                fontSize: 50,
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>

            <Typography
              variant="h4"
              fontWeight="bold"
              mt={2}
            >
              {user.name}
            </Typography>

            <Typography>{user.email}</Typography>

            <Chip
              label={user.role.toUpperCase()}
              color="success"
              sx={{ mt: 2 }}
            />
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={3}
            >
              Profile Information
            </Typography>

            <Stack spacing={3}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Person color="primary" />

                <Box>
                  <Typography
                    color="text.secondary"
                    fontSize={14}
                  >
                    Full Name
                  </Typography>

                  <Typography fontWeight="bold">
                    {user.name}
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Email color="primary" />

                <Box>
                  <Typography
                    color="text.secondary"
                    fontSize={14}
                  >
                    Email
                  </Typography>

                  <Typography fontWeight="bold">
                    {user.email}
                  </Typography>
                </Box>
              </Stack>
            </Stack>

            <Divider sx={{ my: 4 }} />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    textAlign: "center",
                    py: 4,
                    borderRadius: 4,
                    bgcolor: "#E3F2FD",
                    boxShadow: 2,
                  }}
                >
                  <LocalParking
                    sx={{
                      fontSize: 55,
                      color: "#1976d2",
                    }}
                  />

                  <Typography
                    variant="h3"
                    fontWeight="bold"
                  >
                    {totalBookings}
                  </Typography>

                  <Typography color="text.secondary">
                    Total Bookings
                  </Typography>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    textAlign: "center",
                    py: 4,
                    borderRadius: 4,
                    bgcolor: "#E8F5E9",
                    boxShadow: 2,
                  }}
                >
                  <Person
                    sx={{
                      fontSize: 55,
                      color: "#2E7D32",
                    }}
                  />

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                  >
                    {user.role.toUpperCase()}
                  </Typography>

                  <Typography color="text.secondary">
                    Account Type
                  </Typography>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    textAlign: "center",
                    py: 4,
                    borderRadius: 4,
                    bgcolor: "#FFF8E1",
                    boxShadow: 2,
                  }}
                >
                  <CheckCircle
                    sx={{
                      fontSize: 55,
                      color: "#F9A825",
                    }}
                  />

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                  >
                    Active
                  </Typography>

                  <Typography color="text.secondary">
                    Account Status
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 5,
                py: 1.6,
                borderRadius: 3,
              }}
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </Button>

            <EditProfileDialog
              open={open}
              handleClose={() => setOpen(false)}
              user={user}
              handleSave={handleSave}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ProfilePage;