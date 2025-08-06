import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import AuthProvider from "./AuthProvider/AuthProvider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
//hata dena
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme(); // you can customize this later

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {" "}
      {/* ✅ ADD THIS */}
      <CssBaseline /> {/* ✅ ADD THIS */}
      <HeroUIProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HeroUIProvider>
    </ThemeProvider>
  </StrictMode>
);
