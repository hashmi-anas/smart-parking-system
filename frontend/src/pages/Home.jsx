import { Box } from "@mui/material";

import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import ParkingPreview from "../components/ParkingPreview";
import Stats from "../components/Stats";

function Home() {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Hero />
      <ParkingPreview />
      <Stats />
      <HowItWorks />
    </Box>
  );
}

export default Home;