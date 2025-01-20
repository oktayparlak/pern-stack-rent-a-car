import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorMode,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";

// Örnek kullanıcı bilgileri
const ADMIN_USER = {
  email: "admin@example.com",
  password: "admin123",
};

const NORMAL_USER = {
  email: "user@example.com",
  password: "user123",
};

const Login = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Admin girişi kontrolü
    if (
      formData.email === ADMIN_USER.email &&
      formData.password === ADMIN_USER.password
    ) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
      toast({
        title: "Giriş Başarılı",
        description: "Admin paneline yönlendiriliyorsunuz",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Normal kullanıcı girişi kontrolü
    if (
      formData.email === NORMAL_USER.email &&
      formData.password === NORMAL_USER.password
    ) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "false");
      navigate("/");
      toast({
        title: "Giriş Başarılı",
        description: "Hoş geldiniz",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Hatalı giriş
    toast({
      title: "Giriş Başarısız",
      description: "E-posta veya şifre hatalı",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Container maxW="container.sm" py={8}>
        <Box
          bg={colorMode === "light" ? "white" : "gray.700"}
          p={8}
          borderRadius="lg"
          boxShadow="lg"
        >
          <Stack spacing={4}>
            <Heading textAlign="center" mb={4}>
              Giriş Yap
            </Heading>

            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Stack>
                <Text>
                  <strong>Admin Girişi:</strong> admin@example.com / admin123
                </Text>
                <Text>
                  <strong>Normal Kullanıcı:</strong> user@example.com / user123
                </Text>
              </Stack>
            </Alert>

            <Box as="form" onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>E-posta</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Şifre</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <Button type="submit" colorScheme="blue" size="lg">
                  Giriş Yap
                </Button>

                <Text textAlign="center">
                  Hesabınız yok mu?{" "}
                  <RouterLink to="/register">
                    <Text as="span" color="blue.500">
                      Kayıt Ol
                    </Text>
                  </RouterLink>
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
