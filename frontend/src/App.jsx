import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";


import AuthPage from "./pages/AuthPage";
import GuestDashboard from "./pages/GuestDashboard";
import CampList from "./pages/CampList";
import CampDetails from "./pages/CampDetails";
import Favorites from "./pages/Favorites";
import MyBookings from "./pages/Bookings"

import HostDashboard from "./pages/HostDashboard";
import CreateCamp from "./pages/CreateCamp";
import HostCamps from "./pages/HostCamps";
import EditCamp from "./pages/EditCamp";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Navbar />
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<AuthPage />} />

          {/* Guest Protected Routes */}
          <Route
            path="/guest/dashboard"
            element={
              <ProtectedRoute role="guest">
                <GuestDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute role="guest">
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute role="guest">
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* Guest Camps */}
          <Route
            path="/camps"
            element={
              <ProtectedRoute role="guest">
                <CampList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/camp/:campId"
            element={
              <ProtectedRoute role="guest">
                <CampDetails />
              </ProtectedRoute>
            }
          />

          {/* Host Protected Routes */}
          <Route
            path="/host/dashboard"
            element={
              <ProtectedRoute role="host">
                <HostDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/host/create-camp"
            element={
              <ProtectedRoute role="host">
                <CreateCamp />
              </ProtectedRoute>
            }
          />

          <Route
            path="/host/my-camps"
            element={
              <ProtectedRoute role="host">
                <HostCamps />
              </ProtectedRoute>
            }
          />

          <Route
            path="/host/edit-camp/:campId"
            element={
              <ProtectedRoute role="host">
                <EditCamp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
