import { Box, useColorMode } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { colorMode } = useColorMode();

  return (
    <Router>
      <Box
        as="main"
        height="100vh"
        bg={colorMode === "light" ? "gray.50" : "gray.800"}
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
