import {
    Avatar,
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Rating,
    Stack,
    Typography,
} from "@mui/material";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    review:
      "The booking process is incredibly simple and the interface is very clean. I found a parking slot within seconds.",
  },
  {
    name: "Priya Verma",
    role: "College Student",
    review:
      "I love the real-time parking availability feature. It saves a lot of time during busy hours.",
  },
  {
    name: "Arjun Mehta",
    role: "Business Owner",
    review:
      "Fast, secure and responsive. The overall experience feels like a professional commercial application.",
  },
];

function Testimonials() {
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
          fontWeight="bold"
          align="center"
          mb={2}
        >
          What Our Users Say
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={{
            maxWidth: 650,
            mx: "auto",
            mb: 7,
          }}
        >
          Trusted by users for fast booking, reliable parking
          management and a seamless experience.
        </Typography>

        <Grid container spacing={4}>

          {testimonials.map((user) => (

            <Grid
              key={user.name}
              size={{ xs: 12, md: 4 }}
            >

              <Card
                sx={{
                  height: "100%",
                  borderRadius: 5,
                  p: 2,
                  transition: ".3s",
                  boxShadow: 4,

                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: 10,
                  },
                }}
              >
                <CardContent>

                  <Rating
                    value={5}
                    readOnly
                    sx={{ mb: 2 }}
                  />

                  <Typography
                    color="text.secondary"
                    sx={{
                      minHeight: 95,
                      lineHeight: 1.8,
                    }}
                  >
                    "{user.review}"
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    mt={4}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#1976d2",
                        width: 55,
                        height: 55,
                        fontWeight: "bold",
                      }}
                    >
                      {user.name.charAt(0)}
                    </Avatar>

                    <Box>
                      <Typography
                        fontWeight="bold"
                      >
                        {user.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {user.role}
                      </Typography>
                    </Box>
                  </Stack>

                </CardContent>
              </Card>

            </Grid>

          ))}

        </Grid>

      </Container>
    </Box>
  );
}

export default Testimonials;