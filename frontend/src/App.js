import { Routes, Route } from "react-router-dom";
// pages
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
