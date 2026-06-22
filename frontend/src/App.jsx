import {BrowserRouter, Routes, Route} from "react-router-dom";


import AuthPage from "./pages/AuthPage";
import GuestDashboard from "./pages/GuestDashboard";
import CampList from "./pages/CampList";
import CampDetails from "./pages/CampDetails";
import Favorites from "./pages/Favorites";
import MyBookings from "./pages/MyBookings"

import HostDashboard from "./pages/HostDashboard";
import CreateCamp from "./pages/CreateCamp";
import MyCamps from "./pages/MyCamps";
import EditCamp from "./pages/EditCamp";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<AuthPage/>}/>

        {/* Guest Features */}
     

        <Route path="/guest/dashboard" element={<GuestDashboard/>}/>
        <Route path="/camps" element={<CampList/>} />
        <Route path="/camp/:campId" element={<CampDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/bookings" element={<MyBookings />} />


        <Route path="/host/dashboard" element={<HostDashboard/>}/>
        <Route path="/host/create-camp" element={<CreateCamp/>}/>
        <Route path="/host/my-camps" element={<MyCamps />} />
        <Route path="/host/edit-camp/:campId" element={<EditCamp/>}/>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App;