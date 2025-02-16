import { AuthProvider } from "./AuthContext";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
