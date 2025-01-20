import { Box, Container } from "@chakra-ui/react";
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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Box as="main" height="100vh" display="flex" flexDirection="column">
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
          </Route>

          {/* Public Routes */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <Box flex="1" overflow="auto">
                  <Container maxW="container.xl" py={8}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/cars/:id" element={<CarDetail />} />
                    </Routes>
                  </Container>
                </Box>
              </>
            }
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
