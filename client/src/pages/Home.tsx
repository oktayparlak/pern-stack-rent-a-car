import { useState, useEffect } from "react";
import {
  Container,
  SimpleGrid,
  Box,
  Heading,
  Text,
  useColorMode,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { vehicleService, Vehicle } from "../services/vehicle.service";

const Home = () => {
  const { colorMode } = useColorMode();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleService.getAllVehicles();
        setVehicles(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Araçlar yüklenirken bir hata oluştu"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (isLoading) {
    return (
      <Center h="calc(100vh - 100px)">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="calc(100vh - 100px)">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={8}>Araç Listesi</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {vehicles.map((vehicle) => (
          <Link key={vehicle.id} to={`/car/${vehicle.id}`}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg={colorMode === "light" ? "white" : "gray.700"}
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.02)" }}
            >
              <Box h="200px" overflow="hidden">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box p={4}>
                <Heading size="md" mb={2}>
                  {vehicle.brand} {vehicle.model}
                </Heading>
                <Text fontSize="lg" fontWeight="bold" color="blue.500" mb={2}>
                  ₺{vehicle.priceADay} / gün
                </Text>
                <Text color={colorMode === "light" ? "gray.600" : "gray.300"}>
                  {vehicle.year} • {vehicle.transmission} • {vehicle.fuelType}
                </Text>
                {vehicle.isBooked && (
                  <Text color="red.500" fontWeight="bold" mt={2}>
                    Kiralandı
                  </Text>
                )}
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Home;
