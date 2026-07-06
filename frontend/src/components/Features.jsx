import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import PaymentsIcon from "@mui/icons-material/Payments";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import SecurityIcon from "@mui/icons-material/Security";

const features = [
  {
    title: "Quick Booking",
    icon: <OfflineBoltIcon />,
    desc: "Book your parking slot instantly with zero waiting time.",
    color: "#6366f1",
  },
  {
    title: "Live Availability",
    icon: <LocalParkingIcon />,
    desc: "See real-time parking space availability.",
    color: "#22c55e",
  },
  {
    title: "Secure Booking",
    icon: <SecurityIcon />,
    desc: "End-to-end secure booking system.",
    color: "#f97316",
  },
  {
    title: "24/7 Access",
    icon: <AccessTimeIcon />,
    desc: "Book anytime, anywhere without restrictions.",
    color: "#a855f7",
  },
  {
    title: "Easy Payments",
    icon: <PaymentsIcon />,
    desc: "Fast and secure payment experience.",
    color: "#14b8a6",
  },
  {
    title: "Mobile Friendly",
    icon: <PhoneIphoneIcon />,
    desc: "Fully responsive on all devices.",
    color: "#ec4899",
  },
];

export default function Features() {
  return (
    <Box
      sx={{
        py: 12,
        background: "linear-gradient(to bottom, #f8fafc, #eef2ff)",
      }}
    >
      <Container maxWidth="lg">

        {/* TITLE */}
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          Why Smart Parking?
        </Typography>

        <Typography
          align="center"
          sx={{ mb: 8, color: "text.secondary" }}
        >
          Modern, fast and secure parking experience
        </Typography>

        {/* GRID */}
        <Grid container spacing={4} justifyContent="center">

          {features.map((f) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }}
             key={f.title} sx={{ display: "flex" }}>
              
              <Card
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  p: 2,
                  transition: "0.3s",
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",

                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>

                  {/* ICON CIRCLE */}
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      mx: "auto",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: f.color,
                      color: "white",
                      fontSize: 32,
                    }}
                  >
                    {f.icon}
                  </Box>

                  {/* TITLE */}
                  <Typography variant="h6" fontWeight="bold">
                    {f.title}
                  </Typography>

                  {/* DESC */}
                  <Typography
                    sx={{ mt: 1, color: "text.secondary", fontSize: "0.95rem" }}
                  >
                    {f.desc}
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