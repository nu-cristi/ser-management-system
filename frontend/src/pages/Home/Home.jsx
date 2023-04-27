// import styles from "./styles.module.scss";
//components and hooks
import useAuth from "../../hooks/useAuth";

export default function Home() {
  const username = localStorage.getItem("username");
  const isAuth = useAuth();
  
  return <>{isAuth && <h1>Hello {username}</h1>}</>;
}
