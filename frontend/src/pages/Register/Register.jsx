import styles from "./styles.module.scss";
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
        toast("You have successfully registered an accout");
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error("Invalid email, username or password");
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.register_container}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            <p>Enter your email:</p>
            <input
              className={styles.styled_input}
              placeholder="Email..."
              type="text"
              name="email"
              value={data.email || ""}
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            <p>Choose a username:</p>
            <input
              className={styles.styled_input}
              placeholder="Username..."
              type="text"
              name="username"
              value={data.username || ""}
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            <p>Enter your password:</p>
            <input
              
              className={styles.styled_input}
              placeholder="Password..."
              type="password"
              name="password"
              value={data.password || ""}
              onChange={handleChange}
            />
          </label>
          <input type="submit" className={styles.submit_btn} />
        </form>
        <p>Already own an account?</p>
        <Link to="/" className={styles.login_link}>
          Log in here!
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}
