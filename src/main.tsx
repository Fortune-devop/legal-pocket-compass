
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { ClerkProvider } from "@clerk/clerk-react";

// Instead of using .env, we set the key directly per Lovable guidelines
const CLERK_PUBLISHABLE_KEY = "pk_test_Y2xvc2UtbWlubm93LTEyLmNsZXJrLmFjY291bnRzLmRldiQ";
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);

