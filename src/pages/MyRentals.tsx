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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Grid,
} from "@chakra-ui/react";
import { useState } from "react";

// Örnek veri - Gerçek uygulamada API'den gelecek
const rentalData = [
  {
    id: 1,
    car: {
      brand: "BMW",
      model: "3 Serisi",
      imageUrl:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800",
      year: 2023,
      plate: "34 ABC 123",
      color: "Beyaz",
      transmission: "Otomatik",
      fuel: "Benzin",
    },
    startDate: "2024-02-15",
    endDate: "2024-02-20",
    totalPrice: 7500,
    status: "active",
    pickupLocation: "İstanbul Havalimanı",
    dropoffLocation: "İstanbul Havalimanı",
    insurance: "Tam Kasko",
    additionalServices: ["Bebek Koltuğu", "GPS"],
  },
  {
    id: 2,
    car: {
      brand: "Mercedes",
      model: "C Serisi",
      imageUrl:
        "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800",
      year: 2022,
      plate: "34 XYZ 789",
      color: "Siyah",
      transmission: "Otomatik",
      fuel: "Dizel",
    },
    startDate: "2024-01-10",
    endDate: "2024-01-15",
    totalPrice: 8000,
    status: "completed",
    pickupLocation: "Sabiha Gökçen Havalimanı",
    dropoffLocation: "Sabiha Gökçen Havalimanı",
    insurance: "Tam Kasko",
    additionalServices: ["WiFi"],
  },
];

const MyRentals = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRental, setSelectedRental] = useState<
    (typeof rentalData)[0] | null
  >(null);

  const handleRowClick = (rental: (typeof rentalData)[0]) => {
    setSelectedRental(rental);
    onOpen();
  };

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
                <Tr
                  key={rental.id}
                  onClick={() => handleRowClick(rental)}
                  cursor="pointer"
                  _hover={{
                    bg: colorMode === "light" ? "gray.50" : "gray.600",
                  }}
                >
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

      {/* Detay Modalı */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottomWidth="1px">
            <HStack spacing={3}>
              <Image
                src={selectedRental?.car.imageUrl}
                alt={`${selectedRental?.car.brand} ${selectedRental?.car.model}`}
                boxSize="40px"
                objectFit="cover"
                borderRadius="md"
              />
              <Text>
                {selectedRental?.car.brand} {selectedRental?.car.model}
              </Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedRental && (
              <VStack spacing={8} align="stretch">
                <Box>
                  <Image
                    src={selectedRental.car.imageUrl}
                    alt={`${selectedRental.car.brand} ${selectedRental.car.model}`}
                    w="100%"
                    h="250px"
                    objectFit="cover"
                    borderRadius="xl"
                  />
                </Box>

                <Box>
                  <Text fontSize="lg" fontWeight="bold" mb={4}>
                    Araç Bilgileri
                  </Text>
                  <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={4}
                    bg={colorMode === "light" ? "gray.50" : "gray.700"}
                    p={4}
                    borderRadius="lg"
                  >
                    <HStack>
                      <Text fontWeight="medium">Plaka:</Text>
                      <Text>{selectedRental.car.plate}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="medium">Model Yılı:</Text>
                      <Text>{selectedRental.car.year}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="medium">Renk:</Text>
                      <Text>{selectedRental.car.color}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="medium">Vites:</Text>
                      <Text>{selectedRental.car.transmission}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="medium">Yakıt:</Text>
                      <Text>{selectedRental.car.fuel}</Text>
                    </HStack>
                  </Grid>
                </Box>

                <Box>
                  <Text fontSize="lg" fontWeight="bold" mb={4}>
                    Kiralama Detayları
                  </Text>
                  <VStack
                    spacing={4}
                    align="stretch"
                    bg={colorMode === "light" ? "gray.50" : "gray.700"}
                    p={4}
                    borderRadius="lg"
                  >
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <Box>
                        <Text
                          fontWeight="medium"
                          color="gray.500"
                          fontSize="sm"
                        >
                          Başlangıç Tarihi
                        </Text>
                        <Text>{selectedRental.startDate}</Text>
                      </Box>
                      <Box>
                        <Text
                          fontWeight="medium"
                          color="gray.500"
                          fontSize="sm"
                        >
                          Bitiş Tarihi
                        </Text>
                        <Text>{selectedRental.endDate}</Text>
                      </Box>
                    </Grid>

                    <Box>
                      <Text fontWeight="medium" color="gray.500" fontSize="sm">
                        Alış Yeri
                      </Text>
                      <Text>{selectedRental.pickupLocation}</Text>
                    </Box>

                    <Box>
                      <Text fontWeight="medium" color="gray.500" fontSize="sm">
                        Teslim Yeri
                      </Text>
                      <Text>{selectedRental.dropoffLocation}</Text>
                    </Box>

                    <Box>
                      <Text fontWeight="medium" color="gray.500" fontSize="sm">
                        Sigorta
                      </Text>
                      <Text>{selectedRental.insurance}</Text>
                    </Box>

                    {selectedRental.additionalServices.length > 0 && (
                      <Box>
                        <Text
                          fontWeight="medium"
                          color="gray.500"
                          fontSize="sm"
                        >
                          Ek Hizmetler
                        </Text>
                        <Text>
                          {selectedRental.additionalServices.join(", ")}
                        </Text>
                      </Box>
                    )}

                    <Box pt={2} borderTopWidth="1px">
                      <Text fontWeight="medium" color="gray.500" fontSize="sm">
                        Toplam Ücret
                      </Text>
                      <Text fontSize="xl" fontWeight="bold" color="blue.500">
                        ₺{selectedRental.totalPrice}
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyRentals;
