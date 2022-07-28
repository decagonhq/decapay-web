// import { PersistGate } from 'redux-persist/integration/react'
// import { Provider } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/auth/forgetPassword";
import LoginPage from "./pages/auth/login";
import ResetPassword from "./pages/auth/resetPassword";
import Signup from "./pages/auth/SignupPage";
import Home from "./pages/home/Home";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
