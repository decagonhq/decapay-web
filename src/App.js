// import { PersistGate } from 'redux-persist/integration/react'
// import { Provider } from 'react-redux'
import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={ <Login/> } />
    </Routes>
  </div>
  );
}

export default App;