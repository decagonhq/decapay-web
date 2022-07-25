// import { PersistGate } from 'redux-persist/integration/react'
// import { Provider } from 'react-redux'
import { Routes, Route } from "react-router-dom";
<<<<<<< Updated upstream
import ForgotPassword from "./pages/auth/forgetPassword";
import LoginPage from "./pages/auth/login";
import ResetPassword from "./pages/auth/resetPassword";
import Login from "./pages/LoginPage";
=======
import Login from "./pages/SignupPage";
>>>>>>> Stashed changes

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
