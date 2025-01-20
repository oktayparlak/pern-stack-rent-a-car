import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  useColorMode,
  IconButton,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";

const Cars = () => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const navigate = useNavigate();

  // Örnek veri - Gerçek uygulamada API'den gelecek
  const cars = [
    {
      id: 1,
      brand: "BMW",
      model: "3 Serisi",
      year: 2023,
      price: 1500,
      status: "Müsait",
    },
    {
      id: 2,
      brand: "Mercedes",
      model: "C Serisi",
      year: 2022,
      price: 1800,
      status: "Kirada",
    },
    {
      id: 3,
      brand: "Audi",
      model: "A4",
      year: 2023,
      price: 1600,
      status: "Müsait",
    },
  ];

  const handleDelete = (id: number) => {
    // API çağrısı yapılacak
    toast({
      title: "Araba silindi",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Arabalar</Heading>
        <Button as={Link} to="/admin/cars/new" colorScheme="blue">
          Yeni Araba Ekle
        </Button>
      </HStack>

      <Box
        bg={colorMode === "light" ? "white" : "gray.700"}
        borderRadius="lg"
        shadow="md"
        overflow="hidden"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Marka</Th>
              <Th>Model</Th>
              <Th>Yıl</Th>
              <Th>Günlük Fiyat</Th>
              <Th>Durum</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cars.map((car) => (
              <Tr
                key={car.id}
                onClick={() => navigate(`/admin/cars/edit/${car.id}`)}
                _hover={{
                  bg: colorMode === "light" ? "gray.50" : "gray.600",
                  cursor: "pointer",
                }}
              >
                <Td>{car.brand}</Td>
                <Td>{car.model}</Td>
                <Td>{car.year}</Td>
                <Td>₺{car.price}</Td>
                <Td>{car.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Cars;
