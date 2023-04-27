import axios from "axios";
//components and hooks
import User from "../../components/User/User";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function Users() {
  const [data, setData] = useState(null);
  // const [loaded, setLoaded] = useState(false);
  useAuth();

  useEffect(() => {
    axios.get("http://localhost:4000/api/users").then((response) => {
      setData(response.data);
      // setLoaded(true);
    });
  }, []);

  // useEffect(()=>{
  //   if(loaded){
  //     let reverseArray = [...data];
  //     reverseArray.reverse();
  //     console.log(reverseArray.reverse)
  //     setData(reverseArray);
  //   }
  // },[loaded])

  return (
    <>
      <h1>Users Table:</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        {data &&
          data.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <input type="button" value="Delete" />
              </td>
            </tr>
          ))}
      </table>
    </>
  );
}
