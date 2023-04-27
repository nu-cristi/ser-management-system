import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth(){
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('jwtToken') === null){
      alert('You are not logged in!')
      navigate('/')
    }else{
      setIsAuth(true);
    }
  }, [])
  return isAuth;
}