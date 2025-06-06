import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Auth, Login, Register, ForgotPassword, Home, CreateImage, Gallery, TermsAndConditions } from "./pages";
import useAuth from "./hooks/useAuth";
import AppProviders from "./contexts/Provider";
import { Toaster } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth/login" />;
};

const App = () => {
  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "0.9rem",
            maxWidth: "100%",
          },
        }}
      />
      <AppProviders>
        <Router>
          <Routes>
            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
              <Route index element={<CreateImage />} />
              <Route path="gallery" element={<Gallery />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/auth/*" element={<Auth />}>
              <Route index path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AppProviders>
    </>
  );
};

export default App;
