import { Box, useColorMode } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CarDetail from "./pages/CarDetail";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Cars from "./pages/admin/Cars";
import NewCar from "./pages/admin/NewCar";
import EditCar from "./pages/admin/EditCar";
import Bookings from "./pages/admin/Bookings";
import ProtectedRoute from "./components/ProtectedRoute";
import MyRentals from "./pages/MyRentals";
import Profile from "./pages/Profile";

function App() {
  const { colorMode } = useColorMode();

  const PublicLayout = ({ children }: { children: React.ReactNode }) => (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      bg={colorMode === "light" ? "white" : "gray.800"}
      overflow="hidden"
    >
      <Navbar />
      <Box
        flex="1"
        bg={colorMode === "light" ? "white" : "gray.800"}
        overflow="auto"
      >
        {children}
      </Box>
    </Box>
  );

  return (
    <Routes>
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="cars" element={<Cars />} />
        <Route path="cars/new" element={<NewCar />} />
        <Route path="cars/edit/:id" element={<EditCar />} />
        <Route path="bookings" element={<Bookings />} />
      </Route>

      {/* Protected User Routes */}
      <Route
        path="/my-rentals"
        element={
          <ProtectedRoute>
            <PublicLayout>
              <MyRentals />
            </PublicLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <PublicLayout>
              <Profile />
            </PublicLayout>
          </ProtectedRoute>
        }
      />

      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/login"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />
      <Route
        path="/register"
        element={
          <PublicLayout>
            <Register />
          </PublicLayout>
        }
      />
      <Route
        path="/car/:id"
        element={
          <PublicLayout>
            <CarDetail />
          </PublicLayout>
        }
      />
    </Routes>
  );
}

export default App;
