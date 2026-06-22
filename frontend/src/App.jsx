import { BrowserRouter, Routes, Route } from "react-router-dom";


import AuthPage from "./pages/AuthPage";
import GuestDashboard from "./pages/GuestDashboard";
import CampList from "./pages/CampList";
// import CampDetails from "./pages/CampDetails";
// import Favorites from "./pages/Favorites";
// import MyBookings from "./pages/MyBookings"

import HostDashboard from "./pages/HostDashboard";
import CreateCamp from "./pages/CreateCamp";
import MyCamps from "./pages/MyCamps";
import EditCamp from "./pages/EditCamp";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
{/* 
          <Route
            path="/favorites"
            element={
              <ProtectedRoute role="guest">
                <Favorites />
              </ProtectedRoute>
            }
          /> */}

          {/* <Route
            path="/bookings"
            element={
              <ProtectedRoute role="guest">
                <MyBookings />
              </ProtectedRoute>
            }
          /> */}

          {/* Public Camps */}
          <Route path="/camps" element={<CampList />} />
          {/* <Route path="/camp/:campId" element={<CampDetails />} /> */}

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
                <MyCamps />
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