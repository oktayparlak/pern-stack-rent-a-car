import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface CarCardProps {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
}

const CarCard = ({ id, brand, model, year, price, imageUrl }: CarCardProps) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cars/${id}`);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={colorMode === "light" ? "white" : "gray.700"}
      _hover={{
        shadow: "xl",
        transform: "translateY(-2px)",
        cursor: "pointer",
      }}
      transition="all 0.2s"
      height="100%"
      display="flex"
      flexDirection="column"
      onClick={handleClick}
    >
      <Box position="relative" paddingTop="60%">
        <Image
          src={imageUrl}
          alt={`${brand} ${model}`}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Box>
      <VStack align="stretch" p={4} flex="1" spacing={3}>
        <Text
          fontSize="xl"
          fontWeight="bold"
          color={colorMode === "light" ? "gray.800" : "white"}
        >
          {brand} {model}
        </Text>
        <Text color={colorMode === "light" ? "gray.600" : "gray.300"}>
          Yıl: {year}
        </Text>
        <Text
          color={colorMode === "light" ? "blue.600" : "blue.200"}
          fontSize="lg"
          fontWeight="semibold"
        >
          ₺{price} / gün
        </Text>
        <Button
          colorScheme="blue"
          size="lg"
          mt="auto"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/cars/${id}`);
          }}
        >
          Detayları Gör
        </Button>
      </VStack>
    </Box>
  );
};

export default CarCard;
