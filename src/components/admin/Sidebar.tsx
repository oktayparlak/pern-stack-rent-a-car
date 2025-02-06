import {
  Box,
  VStack,
  Link,
  Icon,
  useColorMode,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FiHome, FiCar, FiCalendar } from "react-icons/fi";

interface SidebarProps {
  width?: string;
}

const Sidebar = ({ width = "60" }: SidebarProps) => {
  const { colorMode } = useColorMode();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: FiHome,
      path: "/admin",
    },
    {
      name: "Araçlar",
      icon: FiCar,
      path: "/admin/cars",
    },
    {
      name: "Kiralamalar",
      icon: FiCalendar,
      path: "/admin/bookings",
    },
  ];

  return (
    <Box
      as="nav"
      pos="fixed"
      h="calc(100vh - 60px)"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={colorMode === "light" ? "white" : "gray.800"}
      borderRightWidth="1px"
      w={width}
    >
      <VStack spacing={2} align="stretch" p={4}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              as={RouterLink}
              to={item.path}
              p={3}
              borderRadius="md"
              _hover={{
                bg: colorMode === "light" ? "gray.100" : "gray.700",
                textDecoration: "none",
              }}
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
            >
              <HStack spacing={3}>
                <Icon as={item.icon} boxSize={5} />
                <Text>{item.name}</Text>
              </HStack>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Sidebar;
