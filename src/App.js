// import { PersistGate } from 'redux-persist/integration/react'
// import { Provider } from 'react-redux'
import { Routes, Route } from "react-router-dom"
// import Home from "./components/Home";
import LogoComponent from "./components/LogoComponent";
// import InputComponent from "./components/InputComponent";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={ <LogoComponent/> } />
    </Routes>
  </div>
  );
}

export default App;