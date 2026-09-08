"use client";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { PansofieProvider } from "../state/PansofieContext";
import { LanguageProvider } from "../state/LanguageContext";

export default function LegacyApp() {
  return <BrowserRouter><LanguageProvider><PansofieProvider><App /></PansofieProvider></LanguageProvider></BrowserRouter>;
}
