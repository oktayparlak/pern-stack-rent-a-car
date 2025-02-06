import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorMode,
  Center,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { vehicleService } from "../../services/vehicle.service";

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const [totalVehicles, setTotalVehicles] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicles = await vehicleService.getAllVehicles();
        setTotalVehicles(vehicles.length);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Bir hata oluştu");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Center h="calc(100vh - 200px)">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="calc(100vh - 200px)">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box>
      <SimpleGrid columns={1} spacing={6}>
        <Box
          bg={colorMode === "light" ? "white" : "gray.700"}
          p={6}
          borderRadius="lg"
          shadow="md"
        >
          <Stat>
            <StatLabel fontSize="lg">Toplam Araç Sayısı</StatLabel>
            <StatNumber fontSize="4xl">{totalVehicles}</StatNumber>
          </Stat>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
