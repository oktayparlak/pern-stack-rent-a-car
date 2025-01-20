import {
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorMode,
  useToast,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const Profile = () => {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "Örnek Kullanıcı",
    email: "user@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Şifre değişikliği kontrolü
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        toast({
          title: "Hata",
          description: "Yeni şifreler eşleşmiyor",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (!formData.currentPassword) {
        toast({
          title: "Hata",
          description: "Mevcut şifrenizi girmelisiniz",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }

    // API çağrısı yapılacak
    toast({
      title: "Başarılı",
      description: "Profil bilgileriniz güncellendi",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container
      maxW="container.md"
      py={8}
      minH="calc(100vh - 64px)"
      bg={colorMode === "light" ? "white" : "gray.800"}
      display="flex"
      flexDirection="column"
    >
      <VStack spacing={8} align="stretch" flex="1">
        <Heading color={colorMode === "light" ? "gray.800" : "white"}>
          Profil Bilgilerim
        </Heading>

        <VStack
          as="form"
          onSubmit={handleSubmit}
          spacing={6}
          align="stretch"
          bg={colorMode === "light" ? "white" : "gray.700"}
          p={8}
          borderRadius="lg"
          shadow="md"
        >
          <Text fontSize="xl" fontWeight="bold">
            Kişisel Bilgiler
          </Text>

          <FormControl>
            <FormLabel>Ad Soyad</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormControl>

          <FormControl>
            <FormLabel>E-posta</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <Divider my={4} />

          <Text fontSize="xl" fontWeight="bold">
            Şifre Değiştir
          </Text>

          <FormControl>
            <FormLabel>Mevcut Şifre</FormLabel>
            <Input
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Yeni Şifre</FormLabel>
            <Input
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Yeni Şifre Tekrar</FormLabel>
            <Input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="100%"
            mt={4}
          >
            Değişiklikleri Kaydet
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Profile;
