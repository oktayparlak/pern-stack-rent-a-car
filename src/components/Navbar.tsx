import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  useColorMode,
  Switch,
  HStack,
  Icon,
  Container,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="nav"
      bg={colorMode === "light" ? "white" : "gray.900"}
      py={4}
      shadow="sm"
      position="sticky"
      top={0}
      zIndex={1000}
      width="100%"
      borderBottom="1px"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
    >
      <Container maxW="container.xl" px={4}>
        <Flex alignItems="center" height="100%">
          <Heading
            size="md"
            color={colorMode === "light" ? "blue.600" : "blue.200"}
            cursor="pointer"
            _hover={{ color: colorMode === "light" ? "blue.700" : "blue.300" }}
          >
            Araç Kiralama
          </Heading>
          <Spacer />
          <HStack spacing={4}>
            <Flex alignItems="center" gap={2}>
              <Icon
                as={SunIcon}
                color={colorMode === "light" ? "orange.500" : "gray.500"}
              />
              <Switch
                colorScheme="blue"
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
              />
              <Icon
                as={MoonIcon}
                color={colorMode === "light" ? "gray.500" : "blue.200"}
              />
            </Flex>
            <Button colorScheme="blue" variant="outline" size="md">
              Giriş Yap
            </Button>
            <Button colorScheme="blue" size="md">
              Üye Ol
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
