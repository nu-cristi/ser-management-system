import axios from "axios";
//components and hooks
import User from "../../components/User/User";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function Users() {
  const [data, setData] = useState(null);
  useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users")
      .then((response) => setData(response.data));
  }, []);

  return <>{data && data.map((user) => <User key={user._id} user={user} />)}</>;
}
