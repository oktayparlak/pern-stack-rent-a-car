import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  HStack,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileLoading(true);

    try {
      // TODO: API'ye profil güncelleme isteği gönderilecek
      toast({
        title: "Profil güncellendi",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Güncelleme başarısız",
        description: error instanceof Error ? error.message : "Bir hata oluştu",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordLoading(true);

    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("Yeni şifreler eşleşmiyor");
      }
      if (!passwordData.currentPassword) {
        throw new Error("Mevcut şifrenizi girmelisiniz");
      }

      // TODO: API'ye şifre güncelleme isteği gönderilecek
      toast({
        title: "Şifre güncellendi",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      // Şifre alanlarını temizle
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast({
        title: "Şifre güncelleme başarısız",
        description: error instanceof Error ? error.message : "Bir hata oluştu",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
      <VStack spacing={8}>
        <Heading size="lg">Profil Bilgileri</Heading>

        {/* Kişisel Bilgiler Formu */}
        <VStack
          as="form"
          onSubmit={handleProfileSubmit}
          spacing={6}
          width="100%"
        >
          <Text fontWeight="bold" alignSelf="flex-start">
            Kişisel Bilgiler
          </Text>
          <HStack spacing={4} width="100%">
            <FormControl isRequired>
              <FormLabel>Ad</FormLabel>
              <Input
                name="firstName"
                value={profileData.firstName}
                onChange={handleProfileChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Soyad</FormLabel>
              <Input
                name="lastName"
                value={profileData.lastName}
                onChange={handleProfileChange}
              />
            </FormControl>
          </HStack>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            isLoading={isProfileLoading}
          >
            Profili Güncelle
          </Button>
        </VStack>

        <Divider />

        {/* Şifre Değiştirme Formu */}
        <VStack
          as="form"
          onSubmit={handlePasswordSubmit}
          spacing={6}
          width="100%"
        >
          <Text fontWeight="bold" alignSelf="flex-start">
            Şifre Değiştir
          </Text>
          <FormControl>
            <FormLabel>Mevcut Şifre</FormLabel>
            <Input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Yeni Şifre</FormLabel>
            <Input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Yeni Şifre Tekrar</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            isLoading={isPasswordLoading}
          >
            Şifreyi Güncelle
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Profile;
