import styles from "./styles.module.scss";
//components and hooks
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Home() {
  // This is where I used the username that was sent to the frontend together with the token.
  const username = localStorage.getItem("username");
  const isAuth = useAuth();

  return isAuth ? (
    <>
      <div className={styles.container}>
        <h1>Hello, {username}!</h1>
        <p>
          Click <Link to="/Users">HERE</Link> to see a table of all the users
        </p>
      </div>
    </>
  ) : null;
}
