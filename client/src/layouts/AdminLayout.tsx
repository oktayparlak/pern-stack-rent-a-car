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
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useState } from "react";
import {
  Outlet,
  useNavigate,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { FiHome, FiTruck, FiCalendar } from "react-icons/fi";

const AdminLayout = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const menuItems = [
    {
      name: "Dashboard",
      icon: FiHome,
      path: "/admin",
    },
    {
      name: "Araçlar",
      icon: FiTruck,
      path: "/admin/cars",
    },
    {
      name: "Kiralamalar",
      icon: FiCalendar,
      path: "/admin/bookings",
    },
  ];

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

          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                justifyContent="flex-start"
                mb={2}
                onClick={() => navigate(item.path)}
                bg={
                  isActive
                    ? colorMode === "light"
                      ? "gray.100"
                      : "gray.700"
                    : "transparent"
                }
                color={
                  isActive
                    ? colorMode === "light"
                      ? "blue.500"
                      : "blue.200"
                    : undefined
                }
                _hover={{
                  bg: colorMode === "light" ? "gray.100" : "gray.700",
                }}
              >
                <HStack spacing={3}>
                  <Icon as={item.icon} boxSize={5} />
                  <Text>{item.name}</Text>
                </HStack>
              </Button>
            );
          })}
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
            <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
              <Button variant="ghost" colorScheme="blue">
                Siteye Dön
              </Button>
            </Link>
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
