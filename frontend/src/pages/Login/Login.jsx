import styles from "./styles.module.scss";
import "react-toastify/dist/ReactToastify.css";
// hooks and components
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { handleInputChange } from "../../utils";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useAuth();

  const handleChange = (event) => handleInputChange(event, setData);
  function handleSubmit(event) {
    event.preventDefault();
    //Sends an error if either of the fields are empty
    if (!data.email || !data.password) {
      toast.error("Email or password cannot be empty");
      return;
    }
    axios
      .post("http://localhost:4000/api/users/login", data)
      .then((response) => {
        // Saves token and username in local storage.
        // I used local storage for development reasons because it was quicker to use and due to its persistance.
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("username", response.data.username);

        if(useAuth){
          navigate("/Home");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error("Incorrect email or password");
      });
  }

  // Improvements: create a form component.
  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email" className={styles.label}>
            <p>Enter your email:</p>
            <input
              placeholder="Email..."
              className={styles.styled_input}
              type="text"
              name="email"
              value={data.email || ""}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password" className={styles.label}>
            <p>Enter your password:</p>
            <input
              placeholder="Password..."
              className={styles.styled_input}
              type="password"
              name="password"
              value={data.password || ""}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className={styles.submit_btn}>Submit</button>
        </form>
        <p>Don't have an account?</p>
        <Link to="/Register" className={styles.register_link}>
          Sign up here!
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}
