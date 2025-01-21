import {
  Box,
  Container,
  Grid,
  Heading,
  useColorMode,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import CarCard from "../components/CarCard";

// Örnek veri - Gerçek uygulamada API'den gelecek
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
  {
    id: 5,
    brand: "BMW",
    model: "5 Serisi",
    year: 2023,
    price: 1800,
    imageUrl:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800",
  },
  {
    id: 6,
    brand: "Mercedes",
    model: "E Serisi",
    year: 2022,
    price: 2000,
    imageUrl:
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800",
  },
];

const ITEMS_PER_PAGE = 4;

const Home = () => {
  const { colorMode } = useColorMode();
  const [currentPage, setCurrentPage] = useState(1);

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(sampleCars.length / ITEMS_PER_PAGE);

  // Mevcut sayfada gösterilecek arabaları hesapla
  const currentCars = sampleCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Box flex="1" overflow="auto" py={8}>
      <Container
        maxW="container.xl"
        h="full"
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
        borderRadius="xl"
        p={8}
        boxShadow="lg"
        borderWidth="1px"
        borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
      >
        <Heading mb={6} color={colorMode === "light" ? "gray.800" : "white"}>
          Kiralık Araçlar
        </Heading>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={6}
          pb={8}
        >
          {currentCars.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              brand={car.brand}
              model={car.model}
              year={car.year}
              price={car.price}
              imageUrl={car.imageUrl}
            />
          ))}
        </Grid>

        {/* Pagination */}
        <HStack justify="center" spacing={4} mt={8}>
          <Button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            isDisabled={currentPage === 1}
            colorScheme="blue"
            variant="outline"
          >
            Önceki
          </Button>

          <HStack spacing={2}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                colorScheme={currentPage === page ? "blue" : "gray"}
                variant={currentPage === page ? "solid" : "outline"}
              >
                {page}
              </Button>
            ))}
          </HStack>

          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            isDisabled={currentPage === totalPages}
            colorScheme="blue"
            variant="outline"
          >
            Sonraki
          </Button>
        </HStack>

        <Text
          textAlign="center"
          mt={4}
          color={colorMode === "light" ? "gray.600" : "gray.300"}
        >
          Toplam {sampleCars.length} araç, Sayfa {currentPage}/{totalPages}
        </Text>
      </Container>
    </Box>
  );
};

export default Home;
