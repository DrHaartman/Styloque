import HomePage from "./Components/Pages/homePage"; 
import Login from "./Components/Pages/LogIn";
import Register from "./Components/Pages/Register";
import Layout from "./Components/Layout";
import { Routes, Route, } from "react-router-dom";
import { UserContextProvider } from "./userContext";

function App() {

  return (
      <>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </UserContextProvider>
    </>
  )
}

export default App
