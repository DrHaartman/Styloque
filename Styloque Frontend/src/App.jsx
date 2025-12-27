import HomePage from "./Components/Pages/homePage"; 
import Login from "./Components/Pages/LogIn";
import Register from "./Components/Pages/Register";
import Layout from "./Components/Layout";
import { Routes, Route, } from "react-router-dom";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
