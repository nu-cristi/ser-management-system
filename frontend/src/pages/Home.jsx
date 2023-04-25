// import styles from "./styles.module.scss";
import useFetch from "../hooks/useFetch";

export default function Home() {
  const data = useFetch("/api/users", "get");

  return (
    <>
      {data && data.map((user) => (
        <div key={user._id}>{user.username}</div>
      ))}
    </>
  );
}
