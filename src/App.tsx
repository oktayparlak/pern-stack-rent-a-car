import { Box, Container, Grid, Heading, useColorMode } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import CarCard from "./components/CarCard";

const sampleCars = [
  {
    id: 1,
    brand: "BMW",
    model: "3 Serisi",
    year: 2023,
    price: 1500,
    imageUrl:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800",
  },
  {
    id: 2,
    brand: "Mercedes",
    model: "C Serisi",
    year: 2022,
    price: 1600,
    imageUrl:
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800",
  },
  {
    id: 3,
    brand: "Audi",
    model: "A4",
    year: 2023,
    price: 1450,
    imageUrl:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800",
  },
  {
    id: 4,
    brand: "Volkswagen",
    model: "Passat",
    year: 2022,
    price: 1200,
    imageUrl:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800",
  },
];

function App() {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="main"
      height="100vh"
      bg={colorMode === "light" ? "gray.50" : "gray.800"}
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      <Navbar />
      <Box flex="1" overflow="auto" py={8}>
        <Container maxW="container.xl" h="full">
          <Heading mb={6} color={colorMode === "light" ? "gray.800" : "white"}>
            Kiralık Araçlar
          </Heading>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={6}
            pb={8}
          >
            {sampleCars.map((car) => (
              <CarCard
                key={car.id}
                brand={car.brand}
                model={car.model}
                year={car.year}
                price={car.price}
                imageUrl={car.imageUrl}
              />
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
