import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorMode,
  Heading,
  SimpleGrid,
  Textarea,
  useToast,
  HStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Container,
  Image,
  Center,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vehicleService, Vehicle } from "../../services/vehicle.service";

interface FormData {
  brand: string;
  model: string;
  year: number;
  priceADay: number;
  seats: number;
  power: number;
  fuelType: string;
  transmission: string;
  image: string;
}

const EditCar = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    priceADay: 0,
    seats: 5,
    power: 0,
    fuelType: "Gasoline",
    transmission: "manual",
    image: "",
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return;
      try {
        const data = await vehicleService.getVehicleById(id);
        setFormData({
          brand: data.brand,
          model: data.model,
          year: data.year,
          priceADay: data.priceADay,
          seats: data.seats,
          power: data.power,
          fuelType: data.fuelType,
          transmission: data.transmission,
          image: data.image,
        });
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Araç yüklenirken bir hata oluştu"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsSaving(true);
    try {
      await vehicleService.updateVehicle(id, formData);
      toast({
        title: "Araç güncellendi",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/admin/cars");
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
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await vehicleService.deleteVehicle(id);
      toast({
        title: "Araç silindi",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/admin/cars");
    } catch (error) {
      toast({
        title: "Silme başarısız",
        description: error instanceof Error ? error.message : "Bir hata oluştu",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNumberChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

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
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Araba Düzenle</Heading>
        <Button colorScheme="red" onClick={() => setIsDeleteDialogOpen(true)}>
          Arabayı Sil
        </Button>
      </HStack>

      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {/* Sol Taraf - Form */}
            <Box as="form" onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Marka</FormLabel>
                  <Input
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Model</FormLabel>
                  <Input
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Yıl</FormLabel>
                  <NumberInput
                    min={1900}
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={(value) => handleNumberChange("year", value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Günlük Fiyat (₺)</FormLabel>
                  <NumberInput
                    min={0}
                    value={formData.priceADay}
                    onChange={(value) => handleNumberChange("priceADay", value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Koltuk Sayısı</FormLabel>
                  <NumberInput
                    min={1}
                    max={9}
                    value={formData.seats}
                    onChange={(value) => handleNumberChange("seats", value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Motor Gücü (HP)</FormLabel>
                  <NumberInput
                    min={0}
                    value={formData.power}
                    onChange={(value) => handleNumberChange("power", value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Yakıt Tipi</FormLabel>
                  <Select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                  >
                    <option value="Gasoline">Benzin</option>
                    <option value="Diesel">Dizel</option>
                    <option value="Electric">Elektrik</option>
                    <option value="Hybrid">Hibrit</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Vites</FormLabel>
                  <Select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                  >
                    <option value="manual">Manuel</option>
                    <option value="automatic">Otomatik</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Resim URL</FormLabel>
                  <Input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  isLoading={isSaving}
                >
                  Kaydet
                </Button>
              </VStack>
            </Box>

            {/* Sağ Taraf - Önizleme */}
            <Box>
              <VStack spacing={4} position="sticky" top="20px">
                <Heading size="md">Resim Önizleme</Heading>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  width="100%"
                >
                  <Image
                    src={formData.image}
                    alt={`${formData.brand} ${formData.model}`}
                    fallbackSrc="https://via.placeholder.com/400x300?text=Resim+Yok"
                    width="100%"
                    height="300px"
                    objectFit="cover"
                  />
                </Box>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Arabayı Sil
            </AlertDialogHeader>

            <AlertDialogBody>
              Bu arabayı silmek istediğinizden emin misiniz? Bu işlem geri
              alınamaz.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                İptal
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Sil
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default EditCar;
