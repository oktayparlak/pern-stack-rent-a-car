import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Badge,
  useColorMode,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const CarDetail = () => {
  const { colorMode } = useColorMode();
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rentalDates, setRentalDates] = useState({
    startDate: "",
    endDate: "",
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Bugünün tarihini al
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Seçilen tarihi al
    const selectedDate = new Date(value);
    selectedDate.setHours(0, 0, 0, 0);

    // Başlangıç tarihi için kontrol
    if (name === "startDate") {
      if (selectedDate < today) {
        toast({
          title: "Hata",
          description: "Geçmiş bir tarih seçemezsiniz",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      // Eğer bitiş tarihi varsa ve seçilen başlangıç tarihi bitiş tarihinden büyükse
      if (rentalDates.endDate && selectedDate > new Date(rentalDates.endDate)) {
        toast({
          title: "Hata",
          description: "Başlangıç tarihi, bitiş tarihinden büyük olamaz",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }

    // Bitiş tarihi için kontrol
    if (name === "endDate") {
      if (selectedDate < today) {
        toast({
          title: "Hata",
          description: "Geçmiş bir tarih seçemezsiniz",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      // Eğer başlangıç tarihi varsa ve seçilen bitiş tarihi başlangıç tarihinden küçükse
      if (
        rentalDates.startDate &&
        selectedDate < new Date(rentalDates.startDate)
      ) {
        toast({
          title: "Hata",
          description: "Bitiş tarihi, başlangıç tarihinden küçük olamaz",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }

    setRentalDates((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRentClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Giriş Gerekli",
        description: "Araç kiralamak için lütfen giriş yapın",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login", { state: { from: `/car/${id}` } });
      return;
    }
    setIsModalOpen(true);
  };

  const handleRent = () => {
    // API çağrısı yapılacak
    toast({
      title: "Kiralama Başarılı",
      description:
        "Araç başarıyla kiralandı. Kiralamalarım sayfasından takip edebilirsiniz.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setIsModalOpen(false);
    navigate("/my-rentals");
  };

  // Örnek veri - Gerçek uygulamada API'den gelecek
  const carDetails = {
    id: Number(id),
    brand: "BMW",
    model: "3 Serisi",
    year: 2023,
    price: 1500,
    imageUrl:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800",
    specs: {
      motor: "2.0L Turbo",
      beygir: "252 HP",
      yakitTipi: "Benzin",
      vites: "Otomatik",
      koltuk: "5",
      bagaj: "480L",
    },
    features: [
      "Deri Koltuk",
      "Navigasyon",
      "Geri Görüş Kamerası",
      "Bluetooth",
      "Klima",
      "ABS",
      "ESP",
      "Yol Bilgisayarı",
    ],
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Grid
        templateColumns={{ base: "1fr", lg: "3fr 2fr" }}
        gap={6}
        alignItems="start"
      >
        {/* Sol Taraf - Resim */}
        <Box
          borderRadius="lg"
          overflow="hidden"
          bg={colorMode === "light" ? "white" : "gray.700"}
          shadow="md"
        >
          <Image
            src={carDetails.imageUrl}
            alt={`${carDetails.brand} ${carDetails.model}`}
            width="100%"
            height="auto"
            maxH="500px"
            objectFit="cover"
          />
        </Box>

        {/* Sağ Taraf - Detaylar */}
        <Box
          bg={colorMode === "light" ? "white" : "gray.700"}
          p={6}
          borderRadius="lg"
          shadow="md"
        >
          <VStack align="stretch" spacing={6}>
            <Box>
              <Heading size="lg" mb={2}>
                {carDetails.brand} {carDetails.model}
              </Heading>
              <Badge colorScheme="blue" fontSize="lg" px={3} py={1}>
                {carDetails.year}
              </Badge>
            </Box>

            <Text
              fontSize="3xl"
              fontWeight="bold"
              color={colorMode === "light" ? "blue.600" : "blue.200"}
            >
              ₺{carDetails.price} / gün
            </Text>

            <Divider />

            <Box>
              <Heading size="md" mb={4}>
                Teknik Özellikler
              </Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <HStack>
                  <Text fontWeight="bold">Motor:</Text>
                  <Text>{carDetails.specs.motor}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Güç:</Text>
                  <Text>{carDetails.specs.beygir}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Yakıt:</Text>
                  <Text>{carDetails.specs.yakitTipi}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Vites:</Text>
                  <Text>{carDetails.specs.vites}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Koltuk:</Text>
                  <Text>{carDetails.specs.koltuk}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Bagaj:</Text>
                  <Text>{carDetails.specs.bagaj}</Text>
                </HStack>
              </Grid>
            </Box>

            <Divider />

            <Box>
              <Heading size="md" mb={4}>
                Özellikler
              </Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                {carDetails.features.map((feature, index) => (
                  <Text key={index}>• {feature}</Text>
                ))}
              </Grid>
            </Box>

            <Button
              colorScheme="blue"
              size="lg"
              mt={4}
              onClick={handleRentClick}
            >
              Hemen Kirala
            </Button>
          </VStack>
        </Box>
      </Grid>

      {/* Rental Modal - Sadece giriş yapmış kullanıcılar için gösterilir */}
      {isAuthenticated && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Araç Kiralama</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Başlangıç Tarihi</FormLabel>
                  <Input
                    type="date"
                    name="startDate"
                    value={rentalDates.startDate}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Bitiş Tarihi</FormLabel>
                  <Input
                    type="date"
                    name="endDate"
                    value={rentalDates.endDate}
                    onChange={handleDateChange}
                    min={
                      rentalDates.startDate ||
                      new Date().toISOString().split("T")[0]
                    }
                  />
                </FormControl>
                {rentalDates.startDate && rentalDates.endDate && (
                  <Box
                    w="100%"
                    p={4}
                    bg={colorMode === "light" ? "gray.50" : "gray.700"}
                    borderRadius="md"
                  >
                    <Text fontWeight="bold">Toplam Tutar:</Text>
                    <Text
                      fontSize="xl"
                      color={colorMode === "light" ? "blue.600" : "blue.200"}
                    >
                      ₺
                      {carDetails.price *
                        Math.ceil(
                          (new Date(rentalDates.endDate).getTime() -
                            new Date(rentalDates.startDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}
                    </Text>
                  </Box>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                mr={3}
                onClick={() => setIsModalOpen(false)}
              >
                İptal
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleRent}
                isDisabled={!rentalDates.startDate || !rentalDates.endDate}
              >
                Kirala
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default CarDetail;
