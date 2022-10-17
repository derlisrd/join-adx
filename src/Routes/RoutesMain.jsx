import { useCallback, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { env } from "../App/config";
import { useLogin } from "../Context/LoginProvider";
import MainPages from "../Pages/MainPages";
import LoginForm from "../Pages/Auth/LoginForm";
import Home from "../Pages/Home";
import Error_404 from "../Pages/Error/ErrorPage";
import Anuncios from "../Pages/Anuncios";

const BP = env.BASE_PATH;

function RoutesMain() {


    const navigate = useNavigate();
    const {userData} = useLogin();
    const {login} = userData
    

    const PrivateRoute = ({children})=>{
      
      return login ? <MainPages>{children}</MainPages> : <Navigate to={BP+"/"} />
    }
  
    const verificar = useCallback(()=>{
      if(!login){
        navigate(BP+"/")
      }
    },[login,navigate])
    
    
  
    useEffect(() => {
      const ca = new AbortController(); let isActive = true;
      if (isActive) {verificar();}
      return () => {isActive = false; ca.abort();}
    }, [verificar]);
    
    return (
        <Routes>
            <Route path={BP+'/anuncios'} element={<PrivateRoute><Anuncios /> </PrivateRoute>} />
            <Route path={BP+'/home'} element={<PrivateRoute><Home /> </PrivateRoute>} />
            <Route path={BP} element={<LoginForm />} />
            <Route path="*" element={<Error_404 />} />
        </Routes>
    );
}

export default RoutesMain;