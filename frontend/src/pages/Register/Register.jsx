import "react-toastify/dist/ReactToastify.css";
// hooks and components
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!data.email || !data.password) {
      toast.error("Email or password cannot be empty");
      return;
    }
    axios
      .post("http://localhost:4000/api/users/register", data)
      .then((response) => {
        console.log(response);
        toast("You have successfully registered an accout");
        navigate("/")
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error("Invalid email, username or password");
      });
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your email:
          <input
            type="text"
            name="email"
            value={data.email || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Choose a username:
          <input
            type="text"
            name="username"
            value={data.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter your password:
          <input
            type="password"
            name="password"
            value={data.password || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
      Already own an account?
      <Link to="/">Log in here!</Link>
      <ToastContainer />
    </div>
  );
}
