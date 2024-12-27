import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import { Routes,Route } from "react-router-dom"
function App() {
  

  return (
    <>
     <div >
      
<Navbar/>
<Routes>
  <Route path="/" element={<Homepage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/setting" element={<SettingsPage />} />
  
</Routes>




     </div>
    </>
  )
}

export default App
