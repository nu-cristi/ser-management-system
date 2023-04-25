import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(url, action) {
  const [data, setData] = useState(null);

  
    useEffect(() => {
      const fetchData = async () => {
        if(action === "get"){
          const response = await axios.get(url);
          console.log(response.data);
          if (response) {
            console.log("ok");
            setData(response.data);
          }
        }
      };
      fetchData();
    }, []);
  
  

  return data;
}
