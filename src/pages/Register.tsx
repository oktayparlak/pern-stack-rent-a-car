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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Register = () => {
  const { colorMode } = useColorMode();

  return (
    <Container maxW="container.sm" py={8}>
      <Box
        p={8}
        bg={colorMode === "light" ? "white" : "gray.700"}
        rounded="lg"
        shadow="lg"
      >
        <Stack spacing={4}>
          <Heading size="lg" textAlign="center" mb={4}>
            Üye Ol
          </Heading>
          <FormControl>
            <FormLabel>Ad Soyad</FormLabel>
            <Input placeholder="Ad Soyad" />
          </FormControl>
          <FormControl>
            <FormLabel>E-posta</FormLabel>
            <Input type="email" placeholder="ornek@email.com" />
          </FormControl>
          <FormControl>
            <FormLabel>Şifre</FormLabel>
            <Input type="password" placeholder="********" />
          </FormControl>
          <FormControl>
            <FormLabel>Şifre Tekrar</FormLabel>
            <Input type="password" placeholder="********" />
          </FormControl>
          <Button colorScheme="blue" size="lg" mt={2}>
            Üye Ol
          </Button>
          <Text textAlign="center">
            Zaten hesabınız var mı?{" "}
            <RouterLink to="/login">
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Giriş Yapın
              </Text>
            </RouterLink>
          </Text>
        </Stack>
      </Box>
    </Container>
  );
};

export default Register;
