import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store";

const Auth = lazy(() => import("./pages/Auth"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const Home = lazy(() => import("./pages/Home"));
const CreateImage = lazy(() => import("./pages/CreateImage"));
const Gallery = lazy(() => import("./pages/Gallery"));
const BillingOptions = lazy(() => import("./pages/BillingOptions"));
const UserProfile = lazy(() => import("./components/Profile/ProfileContainer"));

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

const App = () => {
  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "0.9rem",
            maxWidth: "100%",
          },
        }}
      />

      <Router>
        <Suspense fallback={<div className="p-4 text-center text-gray-500">Loading...</div>}>
          <Routes>
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            >
              <Route index element={<CreateImage />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="billing" element={<BillingOptions />} />
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
        </Suspense>
      </Router>
    </>
  );
};

export default App;
