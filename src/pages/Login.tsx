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
} from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Örnek admin kontrolü - Gerçek uygulamada API'den kontrol edilecek
    if (
      formData.email === "admin@example.com" &&
      formData.password === "admin123"
    ) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "true");

      const from = location.state?.from?.pathname || "/admin";
      navigate(from, { replace: true });

      toast({
        title: "Giriş başarılı",
        description: "Admin paneline yönlendiriliyorsunuz",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      // Normal kullanıcı girişi - Gerçek uygulamada API'den kontrol edilecek
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "false");

      navigate("/");

      toast({
        title: "Giriş başarılı",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxW="container.sm">
      <Box
        p={8}
        bg={colorMode === "light" ? "white" : "gray.700"}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Stack spacing={6}>
          <Heading textAlign="center">Giriş Yap</Heading>

          <Box as="form" onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>E-posta</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Şifre</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>

              <Button type="submit" colorScheme="blue" size="lg">
                Giriş Yap
              </Button>
            </Stack>
          </Box>

          <Text textAlign="center">
            Hesabınız yok mu?{" "}
            <Link to="/register">
              <Text as="span" color="blue.500">
                Kayıt Ol
              </Text>
            </Link>
          </Text>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;
