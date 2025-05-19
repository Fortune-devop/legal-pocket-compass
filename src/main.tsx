import { createRoot } from "react-dom/client";
import Root from "./App.tsx"; // Note: import Root instead of App
import "./index.css";

createRoot(document.getElementById("root")!).render(<Root />);
