// import { PersistGate } from 'redux-persist/integration/react'
// import { Provider } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/auth/forgetPassword";
import LoginPage from "./pages/auth/login";
import ResetPassword from "./pages/auth/resetPassword";
import Signup from "./pages/auth/SignupPage";
import BudgetDetail from "./pages/budgetDetail/Index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./utils/protectedRoute";
import Budget from "./pages/listBudget/Index";
import BudgetCategory from "./pages/budgetCategory/Index";
import Expenses from "./pages/expenses/Expenses";
import ListBudget from "./pages/dashboard/Index"

function App() {
  return (
    <div className="App">
      <ToastContainer limit={1} style={{ fontSize: "16px" }} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/budgetDetail/expenses" element={<Expenses />} />
        
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <ListBudget />
            </PrivateRoute>
          }
        />
        <Route
          path="/budgets"
          element={
            <PrivateRoute>
              <Budget />
            </PrivateRoute>
          }
        />
        <Route
          path="/budgetDetail/:id"
          element={
            <PrivateRoute>
              <BudgetDetail />
            </PrivateRoute>
          }
        />
       
         <Route
          path="/budgetCategory"
          element={
            <PrivateRoute>
              <BudgetCategory />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
