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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const CarDetail = () => {
  const { colorMode } = useColorMode();
  const { id } = useParams();

  // Örnek veri - Gerçek uygulamada API'den gelecek
  const carDetails = {
    id: 1,
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
    <Box>
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

            <Button colorScheme="blue" size="lg" mt={4}>
              Hemen Kirala
            </Button>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default CarDetail;
