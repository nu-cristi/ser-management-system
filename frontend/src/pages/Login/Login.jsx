import styles from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";
// hooks and components
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({});
  const [isAuth, setIsAuth] = useState(false);
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
      .post("http://localhost:4000/api/users/login", data)
      .then((response) => {
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("username", response.data.username);
        setIsAuth(true);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error("Incorrect email or password")
      });
  }

  useEffect(() => {
    if (isAuth) {
      navigate("/Home");
    }
  }, [isAuth]);

  return (
    <div className={styles.container}>
      <h1>Login</h1>
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
      Don't have an account?
      <Link to="/Register">Sign up here!</Link>
      <ToastContainer />
    </div>
  );
}
