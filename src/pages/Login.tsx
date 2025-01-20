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

const Login = () => {
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
            Giriş Yap
          </Heading>
          <FormControl>
            <FormLabel>E-posta</FormLabel>
            <Input type="email" placeholder="ornek@email.com" />
          </FormControl>
          <FormControl>
            <FormLabel>Şifre</FormLabel>
            <Input type="password" placeholder="********" />
          </FormControl>
          <Button colorScheme="blue" size="lg" mt={2}>
            Giriş Yap
          </Button>
          <Text textAlign="center">
            Hesabınız yok mu?{" "}
            <RouterLink to="/register">
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Üye Olun
              </Text>
            </RouterLink>
          </Text>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;
