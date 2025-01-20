import { Box, Container, useColorMode } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { colorMode } = useColorMode();

  const PublicLayout = ({ children }) => (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1" overflow="auto">
        <Container maxW="container.xl" py={8}>
          {children}
        </Container>
      </Box>
    </Box>
  );

  return (
    <Router>
      <Box minH="100vh" bg={colorMode === "light" ? "gray.50" : "gray.900"}>
        <Routes>
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="cars" element={<Cars />} />
            <Route path="cars/new" element={<NewCar />} />
            <Route path="cars/edit/:id" element={<EditCar />} />
          </Route>

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
            path="/cars/:id"
            element={
              <PublicLayout>
                <CarDetail />
              </PublicLayout>
            }
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
