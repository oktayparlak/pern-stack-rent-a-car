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
import { Link } from "react-router-dom";

const Cars = () => {
  const { colorMode } = useColorMode();
  const toast = useToast();

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
              <Th>İşlemler</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cars.map((car) => (
              <Tr key={car.id}>
                <Td>{car.brand}</Td>
                <Td>{car.model}</Td>
                <Td>{car.year}</Td>
                <Td>₺{car.price}</Td>
                <Td>{car.status}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      as={Link}
                      to={`/admin/cars/edit/${car.id}`}
                      aria-label="Düzenle"
                      icon={<EditIcon />}
                      size="sm"
                      colorScheme="blue"
                    />
                    <IconButton
                      aria-label="Sil"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(car.id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Cars;
