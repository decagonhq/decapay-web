// import { PersistGate } from 'redux-persist/integration/react'
// import { Provider } from 'react-redux'
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={ <Home/> } />
    </Routes>
  </div>
  );
}

export default App;