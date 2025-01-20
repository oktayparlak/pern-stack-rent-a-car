import {
  Box,
  Container,
  Flex,
  Button,
  useColorMode,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  HStack,
  Link,
  useToast,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const toast = useToast();

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    navigate("/login");
    toast({
      title: "Çıkış Yapıldı",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      as="nav"
      bg={colorMode === "light" ? "white" : "gray.800"}
      py={4}
      borderBottom="1px"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Link
            as={RouterLink}
            to="/"
            fontSize="xl"
            fontWeight="bold"
            _hover={{ textDecoration: "none" }}
          >
            Rent A Car
          </Link>

          <HStack spacing={4}>
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              aria-label="Toggle color mode"
              variant="ghost"
            />

            {isAuthenticated ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="ghost"
                >
                  <Avatar size="sm" name="User" bg="blue.500" color="white" />
                </MenuButton>
                <MenuList>
                  {isAdmin ? (
                    <MenuItem onClick={() => navigate("/admin")}>
                      Admin Panel
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={() => navigate("/my-rentals")}>
                      Kiralamalarım
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profil
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link
                as={RouterLink}
                to="/login"
                _hover={{ textDecoration: "none", color: "white" }}
              >
                <Button colorScheme="blue">Giriş Yap</Button>
              </Link>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
