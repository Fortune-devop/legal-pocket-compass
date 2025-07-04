import { createRoot } from "react-dom/client";
import Root from "./App.tsx";
import "./index.css";
import "./amplify-config"; // Import Amplify configuration

createRoot(document.getElementById("root")!).render(<Root />);
