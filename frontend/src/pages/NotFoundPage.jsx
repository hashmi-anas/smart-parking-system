import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f7fb",
      }}
    >
      <Container maxWidth="sm">
        <Box textAlign="center">
          <ErrorOutlineIcon
            sx={{
              fontSize: 120,
              color: "#1976d2",
            }}
          />

          <Typography
            variant="h1"
            fontWeight="bold"
            color="primary"
          >
            404
          </Typography>

          <Typography
            variant="h4"
            fontWeight="bold"
            mt={2}
          >
            Page Not Found
          </Typography>

          <Typography
            mt={2}
            mb={4}
            color="text.secondary"
          >
            The page you're looking for doesn't exist.
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            sx={{
              borderRadius: 3,
              px: 5,
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default NotFoundPage;