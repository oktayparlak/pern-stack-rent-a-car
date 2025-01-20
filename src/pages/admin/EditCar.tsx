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
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCar = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Örnek veri - Gerçek uygulamada API'den gelecek
  const [formData, setFormData] = useState({
    brand: "BMW",
    model: "3 Serisi",
    year: "2023",
    price: "1500",
    imageUrl: "https://example.com/image.jpg",
    specs: {
      motor: "2.0L Turbo",
      beygir: "252 HP",
      yakitTipi: "Benzin",
      vites: "Otomatik",
      koltuk: "5",
      bagaj: "480L",
    },
    features: "Deri Koltuk, Navigasyon, Geri Görüş Kamerası",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API çağrısı yapılacak
    toast({
      title: "Araba başarıyla güncellendi",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate("/admin/cars");
  };

  const handleDelete = () => {
    // API çağrısı yapılacak
    toast({
      title: "Araba başarıyla silindi",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate("/admin/cars");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Araba Düzenle</Heading>
        <Button colorScheme="red" onClick={() => setIsDeleteDialogOpen(true)}>
          Arabayı Sil
        </Button>
      </HStack>

      <Box
        as="form"
        onSubmit={handleSubmit}
        bg={colorMode === "light" ? "white" : "gray.700"}
        p={6}
        borderRadius="lg"
        shadow="md"
      >
        <VStack spacing={6} align="stretch">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
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
              <Input
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Günlük Fiyat (₺)</FormLabel>
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Resim URL</FormLabel>
              <Input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </FormControl>
          </SimpleGrid>

          <Heading size="md" mt={4}>
            Teknik Özellikler
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl>
              <FormLabel>Motor</FormLabel>
              <Input
                name="specs.motor"
                value={formData.specs.motor}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Beygir Gücü</FormLabel>
              <Input
                name="specs.beygir"
                value={formData.specs.beygir}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Yakıt Tipi</FormLabel>
              <Input
                name="specs.yakitTipi"
                value={formData.specs.yakitTipi}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Vites</FormLabel>
              <Input
                name="specs.vites"
                value={formData.specs.vites}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Koltuk Sayısı</FormLabel>
              <Input
                name="specs.koltuk"
                value={formData.specs.koltuk}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Bagaj Hacmi</FormLabel>
              <Input
                name="specs.bagaj"
                value={formData.specs.bagaj}
                onChange={handleChange}
              />
            </FormControl>
          </SimpleGrid>

          <FormControl>
            <FormLabel>Özellikler (Her özelliği virgülle ayırın)</FormLabel>
            <Textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Örn: Deri Koltuk, Navigasyon, Geri Görüş Kamerası"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" size="lg">
            Değişiklikleri Kaydet
          </Button>
        </VStack>
      </Box>

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
