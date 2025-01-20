import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorMode,
  Text,
  Image,
  HStack,
} from "@chakra-ui/react";

// Örnek veri - Gerçek uygulamada API'den gelecek
const rentalData = [
  {
    id: 1,
    car: {
      brand: "BMW",
      model: "3 Serisi",
      imageUrl:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800",
    },
    startDate: "2024-02-15",
    endDate: "2024-02-20",
    totalPrice: 7500,
    status: "active", // active, completed, cancelled
  },
  {
    id: 2,
    car: {
      brand: "Mercedes",
      model: "C Serisi",
      imageUrl:
        "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800",
    },
    startDate: "2024-01-10",
    endDate: "2024-01-15",
    totalPrice: 8000,
    status: "completed",
  },
];

const MyRentals = () => {
  const { colorMode } = useColorMode();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "green";
      case "completed":
        return "blue";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "completed":
        return "Tamamlandı";
      case "cancelled":
        return "İptal Edildi";
      default:
        return status;
    }
  };

  return (
    <Box>
      <Container maxW="container.xl" py={8}>
        <Heading mb={6} color={colorMode === "light" ? "gray.800" : "white"}>
          Kiraladığım Araçlar
        </Heading>
        <Box
          bg={colorMode === "light" ? "white" : "gray.700"}
          borderRadius="lg"
          shadow="md"
          overflow="hidden"
        >
          <Table variant="simple">
            <Thead
              bg={colorMode === "light" ? "gray.50" : "gray.800"}
              borderBottom="1px"
              borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
            >
              <Tr>
                <Th>Araç</Th>
                <Th>Başlangıç Tarihi</Th>
                <Th>Bitiş Tarihi</Th>
                <Th>Toplam Ücret</Th>
                <Th>Durum</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rentalData.map((rental) => (
                <Tr key={rental.id}>
                  <Td>
                    <HStack spacing={3}>
                      <Image
                        src={rental.car.imageUrl}
                        alt={`${rental.car.brand} ${rental.car.model}`}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <Box>
                        <Text fontWeight="bold">
                          {rental.car.brand} {rental.car.model}
                        </Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td>{rental.startDate}</Td>
                  <Td>{rental.endDate}</Td>
                  <Td>₺{rental.totalPrice}</Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(rental.status)}>
                      {getStatusText(rental.status)}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
};

export default MyRentals;
