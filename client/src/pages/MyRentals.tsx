import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  useColorMode,
  Spinner,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { bookingService } from "../services/booking.service";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import type { Booking } from "../services/booking.service";

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "yellow";
    case "APPROVED":
      return "green";
    case "REJECTED":
      return "red";
    case "COMPLETED":
      return "blue";
    default:
      return "gray";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "PENDING":
      return "Onay Bekliyor";
    case "APPROVED":
      return "Onaylandı";
    case "REJECTED":
      return "Reddedildi";
    case "COMPLETED":
      return "Tamamlandı";
    default:
      return status;
  }
};

const MyRentals = () => {
  const { colorMode } = useColorMode();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getMyBookings();
        setBookings(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Bir hata oluştu");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
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
      <VStack spacing={8} align="stretch">
        <Heading size="lg">Kiralamalarım</Heading>

        {bookings.length === 0 ? (
          <Center h="200px">
            <Text>Henüz bir kiralama işleminiz bulunmuyor.</Text>
          </Center>
        ) : (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            {bookings.map((booking) => (
              <GridItem key={booking.id}>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  bg={colorMode === "light" ? "white" : "gray.700"}
                  shadow="md"
                >
                  <Image
                    src={booking.vehicle.image}
                    alt={`${booking.vehicle.brand} ${booking.vehicle.model}`}
                    height="200px"
                    width="100%"
                    objectFit="cover"
                  />
                  <Box p={6}>
                    <VStack align="stretch" spacing={4}>
                      <HStack justify="space-between">
                        <Heading size="md">
                          {booking.vehicle.brand} {booking.vehicle.model}
                        </Heading>
                        <Badge
                          colorScheme={getStatusColor(booking.status)}
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {getStatusText(booking.status)}
                        </Badge>
                      </HStack>

                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <Box>
                          <Text fontWeight="bold">Başlangıç Tarihi</Text>
                          <Text>
                            {format(
                              new Date(booking.startDate),
                              "d MMMM yyyy",
                              {
                                locale: tr,
                              }
                            )}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Bitiş Tarihi</Text>
                          <Text>
                            {format(new Date(booking.endDate), "d MMMM yyyy", {
                              locale: tr,
                            })}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Günlük Fiyat</Text>
                          <Text>₺{booking.vehicle.priceADay}</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Toplam Gün</Text>
                          <Text>
                            {Math.ceil(
                              (new Date(booking.endDate).getTime() -
                                new Date(booking.startDate).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            gün
                          </Text>
                        </Box>
                      </Grid>

                      <Box>
                        <Text fontWeight="bold">Toplam Tutar</Text>
                        <Text fontSize="xl" color="blue.500">
                          ₺
                          {booking.vehicle.priceADay *
                            Math.ceil(
                              (new Date(booking.endDate).getTime() -
                                new Date(booking.startDate).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </Grid>
        )}
      </VStack>
    </Container>
  );
};

export default MyRentals;
