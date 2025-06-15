import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";


import Navbar from "./components/mmm";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import CreatePost from "./pages/PostForm";
import PostForm from "./pages/PostForm";

function App() {
  return (
    <>
      <Router>
        {/* Shared Navbar */}
        <Navbar/>

        {/* Route views */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/posts/:id/edit" element={<PostForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
