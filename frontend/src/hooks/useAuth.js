// hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// custom hook that blocks the user from being able to access certain endpoints unless they are logged in. 
export default function useAuth(){
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('jwtToken')){
      alert('You are not logged in!')
      // sends the user back to the main page
      navigate('/')
    }else{
      setIsAuth(true);
    }
  }, [])
  return isAuth;
}