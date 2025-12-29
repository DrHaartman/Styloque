import HomePage from "./Components/Pages/homePage"; 
import Login from "./Components/Pages/LogIn";
import Register from "./Components/Pages/Register";
import Layout from "./Components/Layout";
import CreatePost from "./Components/Pages/createPost";
import PostPage from "./Components/Pages/postPage";
import EditPage from "./Components/Pages/editPage";
import { Routes, Route, } from "react-router-dom";
import { UserContextProvider } from "./Components/Pages/userContext";

function App() {

  return (
      <>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/edit/:id" element={<EditPage />} />
            </Route>
          </Routes>
        </UserContextProvider>
    </>
  );
}

export default App
