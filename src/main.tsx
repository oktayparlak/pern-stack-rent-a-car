import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./index.css";
import App from "./App.tsx";

const theme = extendTheme({
  fonts: {
    heading: "'Open Sans', system-ui, sans-serif",
    body: "'Open Sans', system-ui, sans-serif",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
