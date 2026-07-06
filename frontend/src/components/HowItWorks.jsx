import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
} from "@mui/material";

import {
    ArrowForward,
    CheckCircle,
    LocalParking,
    Payment,
    Search,
} from "@mui/icons-material";

const steps = [
  {
    icon: <Search sx={{ fontSize: 45 }} />,
    title: "Find Slot",
    desc: "Check available parking spaces in real time.",
  },
  {
    icon: <LocalParking sx={{ fontSize: 45 }} />,
    title: "Select Slot",
    desc: "Choose the parking slot you want.",
  },
  {
    icon: <Payment sx={{ fontSize: 45 }} />,
    title: "Book Instantly",
    desc: "Confirm your reservation in one click.",
  },
  {
    icon: <CheckCircle sx={{ fontSize: 45 }} />,
    title: "Park Easily",
    desc: "Arrive and park without waiting.",
  },
];

export default function HowItWorks() {
  return (
    <Box
      sx={{
        py: 10,
        bgcolor: "#ffffff",
      }}
    >
      <Container maxWidth="lg">

        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          mb={2}
        >
          How It Works
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={7}
        >
          Book your parking slot in four simple steps.
        </Typography>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          {steps.map((step, index) => (
            <Grid
              key={step.title}
              size={{ xs: 12, sm: 6, md: 3 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  height: "100%",
                  transition: ".3s",
                  position: "relative",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 75,
                    height: 75,
                    borderRadius: "50%",
                    bgcolor: "#1976d2",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  {step.icon}
                </Box>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mb={2}
                >
                  {step.title}
                </Typography>

                <Typography color="text.secondary">
                  {step.desc}
                </Typography>

                {index !== steps.length - 1 && (
                  <ArrowForward
                    sx={{
                      display: {
                        xs: "none",
                        md: "block",
                      },
                      position: "absolute",
                      right: -18,
                      top: "45%",
                      color: "#1976d2",
                      fontSize: 32,
                    }}
                  />
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}