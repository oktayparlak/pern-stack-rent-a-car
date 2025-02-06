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
  Button,
  useColorMode,
  useToast,
  ButtonGroup,
  HStack,
  Text,
  Image,
  Spinner,
  Center,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { bookingService, Booking } from "../../services/booking.service";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

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

interface ActionDialogProps {
  booking: Booking;
  action: "APPROVED" | "REJECTED";
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ActionDialog = ({
  booking,
  action,
  isOpen,
  onClose,
  onConfirm,
}: ActionDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const getActionText = () => {
    switch (action) {
      case "APPROVED":
        return "onaylamak";
      case "REJECTED":
        return "reddetmek";
      default:
        return "";
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Kiralama Durumunu Güncelle
          </AlertDialogHeader>

          <AlertDialogBody>
            {`${booking.user?.firstName} ${
              booking.user?.lastName
            } kullanıcısının ${booking.vehicle.brand} ${
              booking.vehicle.model
            } araç kiralama talebini ${getActionText()} istediğinize emin misiniz?`}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              İptal
            </Button>
            <Button
              colorScheme={getStatusColor(action)}
              onClick={onConfirm}
              ml={3}
            >
              Onayla
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

const Bookings = () => {
  const { colorMode } = useColorMode();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedAction, setSelectedAction] = useState<
    "APPROVED" | "REJECTED" | null
  >(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getAllBookings();
      setBookings(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAction = async () => {
    if (!selectedBooking || !selectedAction) return;

    try {
      await bookingService.updateBookingStatus(
        selectedBooking.id,
        selectedAction
      );
      toast({
        title: "Durum güncellendi",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      fetchBookings();
    } catch (error) {
      toast({
        title: "Güncelleme başarısız",
        description: error instanceof Error ? error.message : "Bir hata oluştu",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      onClose();
      setSelectedBooking(null);
      setSelectedAction(null);
    }
  };

  const openActionDialog = (
    booking: Booking,
    action: typeof selectedAction
  ) => {
    setSelectedBooking(booking);
    setSelectedAction(action);
    onOpen();
  };

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
    <Box>
      <Container maxW="container.xl" py={8}>
        <Heading size="lg" mb={6}>
          Kiralama Talepleri
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
              position="sticky"
              top={0}
              zIndex={1}
            >
              <Tr>
                <Th>Araç</Th>
                <Th>Müşteri</Th>
                <Th>Tarih Aralığı</Th>
                <Th>Tutar</Th>
                <Th>Durum</Th>
                <Th>İşlemler</Th>
              </Tr>
            </Thead>
            <Tbody>
              {bookings.map((booking) => (
                <Tr key={booking.id}>
                  <Td>
                    <HStack spacing={3}>
                      {booking.vehicle && (
                        <>
                          <Image
                            src={booking.vehicle.image}
                            alt={`${booking.vehicle.brand} ${booking.vehicle.model}`}
                            boxSize="50px"
                            objectFit="cover"
                            borderRadius="md"
                            fallbackSrc="https://via.placeholder.com/50"
                          />
                          <Box>
                            <Text fontWeight="bold">
                              {booking.vehicle.brand} {booking.vehicle.model}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              {booking.vehicle.year}
                            </Text>
                          </Box>
                        </>
                      )}
                      {!booking.vehicle && (
                        <Text color="red.500">Araç bilgisi bulunamadı</Text>
                      )}
                    </HStack>
                  </Td>
                  <Td>
                    {booking.user ? (
                      <>
                        <Text fontWeight="medium">
                          {booking.user.firstName} {booking.user.lastName}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {booking.user.email}
                        </Text>
                      </>
                    ) : (
                      <Text color="red.500">Kullanıcı bilgisi bulunamadı</Text>
                    )}
                  </Td>
                  <Td>
                    <Text>
                      {format(new Date(booking.startDate), "d MMMM yyyy", {
                        locale: tr,
                      })}
                    </Text>
                    <Text>
                      {format(new Date(booking.endDate), "d MMMM yyyy", {
                        locale: tr,
                      })}
                    </Text>
                  </Td>
                  <Td>
                    {booking.vehicle ? (
                      <>
                        <Text fontWeight="bold">
                          ₺
                          {booking.vehicle.priceADay *
                            Math.ceil(
                              (new Date(booking.endDate).getTime() -
                                new Date(booking.startDate).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {Math.ceil(
                            (new Date(booking.endDate).getTime() -
                              new Date(booking.startDate).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          gün
                        </Text>
                      </>
                    ) : (
                      <Text color="red.500">Fiyat hesaplanamadı</Text>
                    )}
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Badge>
                  </Td>
                  <Td>
                    <ButtonGroup size="sm" variant="outline">
                      {booking.status === "PENDING" && (
                        <>
                          <Button
                            colorScheme="green"
                            onClick={() =>
                              openActionDialog(booking, "APPROVED")
                            }
                          >
                            Onayla
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() =>
                              openActionDialog(booking, "REJECTED")
                            }
                          >
                            Reddet
                          </Button>
                        </>
                      )}
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>

      {selectedBooking && selectedAction && (
        <ActionDialog
          booking={selectedBooking}
          action={selectedAction}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSelectedBooking(null);
            setSelectedAction(null);
          }}
          onConfirm={handleAction}
        />
      )}
    </Box>
  );
};

export default Bookings;
