import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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
      title: "Çıkış Yapıldı",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex minH="100vh" bg={colorMode === "light" ? "gray.50" : "gray.900"}>
      {/* Sidebar */}
      <Box
        as="aside"
        bg={colorMode === "light" ? "white" : "gray.800"}
        w="250px"
        position="fixed"
        left={0}
        h="100vh"
        transform={isSidebarOpen ? "translateX(0)" : "translateX(-100%)"}
        transition="transform 0.3s"
        borderRight="1px"
        borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      >
        <Flex direction="column" h="full">
          <Box p={4}>
            <Text fontSize="xl" fontWeight="bold">
              Admin Panel
            </Text>
          </Box>

          <Button
            variant="ghost"
            justifyContent="flex-start"
            mb={2}
            onClick={() => navigate("/admin")}
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            justifyContent="flex-start"
            onClick={() => navigate("/admin/cars")}
          >
            Araçlar
          </Button>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box
        flex={1}
        ml={isSidebarOpen ? "250px" : 0}
        transition="margin-left 0.3s"
      >
        {/* Header */}
        <HStack
          as="header"
          bg={colorMode === "light" ? "white" : "gray.800"}
          px={4}
          py={2}
          borderBottom="1px"
          borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
          justify="space-between"
          position="sticky"
          top={0}
          zIndex={1000}
        >
          <IconButton
            icon={<HamburgerIcon />}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
            variant="ghost"
          />

          <HStack spacing={4}>
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              aria-label="Toggle color mode"
              variant="ghost"
            />
            <Button onClick={handleLogout} colorScheme="red" variant="ghost">
              Çıkış Yap
            </Button>
          </HStack>
        </HStack>

        {/* Page Content */}
        <Box p={8}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminLayout;
