import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorMode,
} from "@chakra-ui/react";

const Dashboard = () => {
  const { colorMode } = useColorMode();

  const stats = [
    {
      label: "Toplam Araba",
      number: "24",
      helpText: "Son 30 günde +3",
    },
    {
      label: "Aktif Kiralama",
      number: "8",
      helpText: "Son 7 günde +2",
    },
    {
      label: "Toplam Kullanıcı",
      number: "156",
      helpText: "Son 30 günde +12",
    },
  ];

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {stats.map((stat, index) => (
          <Box
            key={index}
            bg={colorMode === "light" ? "white" : "gray.700"}
            p={6}
            borderRadius="lg"
            shadow="md"
          >
            <Stat>
              <StatLabel fontSize="lg">{stat.label}</StatLabel>
              <StatNumber fontSize="4xl" my={2}>
                {stat.number}
              </StatNumber>
              <StatHelpText>{stat.helpText}</StatHelpText>
            </Stat>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
