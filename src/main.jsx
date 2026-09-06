import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./index.css";
import "./r8-living.css";
import "./r9-stability.css";
import "./artkit-v1.css";
import "./product.css";
import App from "./App";
import { PansofieProvider } from "./state/PansofieContext";
import { LanguageProvider } from "./state/LanguageContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <PansofieProvider>
          <App />
        </PansofieProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
