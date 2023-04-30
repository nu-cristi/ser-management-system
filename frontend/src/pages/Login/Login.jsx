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
        toast.error("Incorrect email or password");
      });
  }

  useEffect(() => {
    if (isAuth) {
      navigate("/Home");
    }
  }, [isAuth]);

  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Enter your email:
            <input
              placeholder="Email..."
              className={styles.styled_input}
              type="text"
              name="email"
              value={data.email || ""}
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Enter your password:
            <input
              placeholder="Password..."
              className={styles.styled_input}
              type="password"
              name="password"
              value={data.password || ""}
              onChange={handleChange}
            />
          </label>
          <input type="submit" className={styles.submit_btn}/>
        </form>
        Don't have an account?
        <Link to="/Register" className={styles.register_link}>Sign up here!</Link>
      </div>
      <ToastContainer />
    </div>
  );
}
