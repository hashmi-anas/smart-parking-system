import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  DirectionsCar,
  EventAvailable,
  Group,
  LocalParking,
} from "@mui/icons-material";


import { useBooking } from "../context/BookingContext";

function AdminDashboard() {
  const { stats, bookings, users, slots } = useBooking();
  const pieData = [
  {
    name: "Available",
    value: stats.availableSlots,
  },
  {
    name: "Occupied",
    value: stats.occupiedSlots,
  },
];

const COLORS = ["#4CAF50", "#F44336"];

const barData = [
  {
    name: "Slots",
    value: stats.totalSlots,
  },
  {
    name: "Bookings",
    value: stats.totalBookings,
  },
  {
    name: "Users",
    value: stats.totalUsers,
  },
];

  const getSlotNumber = (slotId) => {
    const slot = slots.find(
      (s) => String(s._id) === String(slotId)
    );

    return slot ? slot.slotNumber : slotId;
  };

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Group sx={{ fontSize: 45 }} />,
      color: "#5e35b1",
      bg: "#ede7f6",
    },
    {
      title: "Total Slots",
      value: stats.totalSlots,
      icon: <LocalParking sx={{ fontSize: 45 }} />,
      color: "#1976d2",
      bg: "#e3f2fd",
    },
    {
      title: "Available",
      value: stats.availableSlots,
      icon: <EventAvailable sx={{ fontSize: 45 }} />,
      color: "#2e7d32",
      bg: "#e8f5e9",
    },
    {
      title: "Occupied",
      value: stats.occupiedSlots,
      icon: <DirectionsCar sx={{ fontSize: 45 }} />,
      color: "#d32f2f",
      bg: "#ffebee",
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        align="center"
      >
        Admin Dashboard
      </Typography>

      <Typography
        align="center"
        color="text.secondary"
        mb={5}
      >
        Smart Parking Analytics
      </Typography>

      {/* Cards */}

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid
            key={card.title}
            size={{ xs: 12, sm: 6, md: 3 }}
          >
            <Card
              sx={{
                borderRadius: 4,
                transition: ".3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography color="text.secondary">
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight="bold"
                  >
                    {card.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    bgcolor: card.bg,
                    color: card.color,
                    p: 2,
                    borderRadius: "50%",
                  }}
                >
                  {card.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>


<Grid container spacing={3} sx={{ mt: 2 }}>

  <Grid size={{ xs: 12, md: 6 }}>
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
        align="center"
      >
        Parking Slot Status
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  </Grid>

 <Grid size={{ xs: 12, md: 6 }}>
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
        align="center"
      >
        System Analytics
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#1976d2"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  </Grid>

</Grid>

     
      {/* Recent Bookings */}

      <Paper
        sx={{
          mt: 5,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ p: 3 }}
        >
          Recent Bookings
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Booking ID</b>
                </TableCell>

                <TableCell>
                  <b>User</b>
                </TableCell>

                <TableCell>
                  <b>Slot</b>
                </TableCell>

                <TableCell>
                  <b>Vehicle</b>
                </TableCell>

                <TableCell>
                  <b>Status</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bookings.slice(0, 8).map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>
                    {booking.bookingId}
                  </TableCell>

                  <TableCell>
                    {booking.userName}
                  </TableCell>

                  <TableCell>
                    {getSlotNumber(
                      booking.slotId
                    )}
                  </TableCell>

                  <TableCell>
                    {booking.vehicleNumber}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={booking.status}
                      color="success"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Users */}

      <Paper
        sx={{
          mt: 5,
          borderRadius: 4,
          p: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          Registered Users
        </Typography>

        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid
              key={user._id}
              size={{ xs: 12, md: 4 }}
            >
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 55,
                      height: 55,
                      bgcolor: "#1976d2",
                    }}
                  >
                    {user.name[0].toUpperCase()}
                  </Avatar>

                  <Box>
                    <Typography
                      fontWeight="bold"
                    >
                      {user.name}
                    </Typography>

                    <Typography
                      color="text.secondary"
                    >
                      {user.email}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default AdminDashboard;