import {
  Box,
  Flex,
  VStack,
  Heading,
  IconButton,
  useColorMode,
  HStack,
  Text,
  Divider,
  Button,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    navigate("/login");
    toast({
      title: "Çıkış yapıldı",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const menuItems = [
    { title: "Dashboard", path: "/admin" },
    { title: "Arabalar", path: "/admin/cars" },
    { title: "Yeni Araba Ekle", path: "/admin/cars/new" },
  ];

  return (
    <Flex h="100vh">
      {/* Sidebar */}
      <Box
        position="fixed"
        h="100vh"
        w="250px"
        bg={colorMode === "light" ? "white" : "gray.800"}
        borderRight="1px"
        borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
        transform={isSidebarOpen ? "translateX(0)" : "translateX(-100%)"}
        transition="transform 0.3s ease-in-out"
        zIndex={2}
      >
        <VStack align="stretch" p={4} spacing={6}>
          <Heading size="md" textAlign="center">
            Admin Panel
          </Heading>
          <Divider />
          <VStack align="stretch" spacing={2}>
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Box
                  p={3}
                  borderRadius="md"
                  _hover={{
                    bg: colorMode === "light" ? "gray.100" : "gray.700",
                  }}
                  cursor="pointer"
                >
                  <Text>{item.title}</Text>
                </Box>
              </Link>
            ))}
          </VStack>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box
        flex={1}
        ml={isSidebarOpen ? "250px" : "0"}
        transition="margin-left 0.3s ease-in-out"
      >
        {/* Header */}
        <HStack
          p={4}
          bg={colorMode === "light" ? "white" : "gray.800"}
          borderBottom="1px"
          borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
          justify="space-between"
          spacing={4}
          position="sticky"
          top={0}
          zIndex={1}
        >
          <IconButton
            aria-label="Menu"
            icon={<HamburgerIcon />}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            variant="ghost"
          />

          <HStack spacing={6}>
            {/* Dark Mode Switch */}
            <HStack spacing={2}>
              <SunIcon />
              <Switch
                colorScheme="blue"
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
              />
              <MoonIcon />
            </HStack>

            {/* Navigation Links */}
            <Text
              cursor="pointer"
              onClick={() => navigate("/")}
              color="blue.500"
              fontWeight="medium"
            >
              Siteye Dön
            </Text>

            {/* Logout Button */}
            <Button
              colorScheme="red"
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              Çıkış Yap
            </Button>
          </HStack>
        </HStack>

        {/* Page Content */}
        <Box p={6}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminLayout;
