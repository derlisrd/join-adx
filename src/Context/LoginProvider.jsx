import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { APICALLER } from '../Services/api';
import {  env } from "../App/config";
import CryptoJS from "crypto-js";

const LoginContext = createContext()

const LoginProvider = ({children}) => {
   // const navigate = useNavigate()
    const CifrarTexto = t => CryptoJS.AES.encrypt(t, env.SECRETO).toString();
    const Descifrar = t => CryptoJS.AES.decrypt(t, env.SECRETO).toString(CryptoJS.enc.Utf8);
    const storage = JSON.parse(sessionStorage.getItem("userData")) || JSON.parse(localStorage.getItem("userData"));
    const [loading,setLoading] = useState(true);
    const [load,setLoad] = useState({
        login:false,
        msj:null,
        active:false
    })
    const initialUserData = { 
        login:false,
        token_user:null,
        email:null,
        remember:false
    }
    const [userData,setUserData] = useState( storage ? storage : initialUserData);    
    
    
    
    const setearLogin = (f,remember)=>{
        setUserData(f);
        sessionStorage.setItem("userData", JSON.stringify(f))
        if(remember){
            localStorage.setItem("userData", JSON.stringify(f))
        } 
    }


    const logOut = useCallback(()=>{
        
        setUserData({login:false,
            token_user:null,
            email:null,
            remember:false});
        localStorage.removeItem("userData");
        sessionStorage.removeItem("userData");

    },[])

    const logIn = async(f,remember)=>{
        setLoading(true)
        setLoad({login:true,active:false,msj:null});
        let promise = await Promise.all([APICALLER.login(f)]);
        let res = promise[0];
        if(res.response){
            setearLogin({
                login:true,
                token_user: CifrarTexto( res.results.token ),
                email:f.email,
                remember:remember
            },remember)
            setLoad({login:false,active:false,msj:null});
        }
        else{
            console.log(res);
            setLoad({login:false,active:true,msj:res.message});
        }
        setLoading(false)
    }


    const verificar = useCallback(async()=>{
        setLoading(true);
        if (userData.login) {
            let res = await APICALLER.validateToken( Descifrar(userData.token_user) );
            if (!res.response) {
                logOut()
            }
        }
        setLoading(false)
    },[userData,logOut])

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {
          verificar();
        }
        return () => {
          isActive = false;
          ca.abort();};
      }, [verificar]);
    
      const values = {userData,logIn,logOut,load,loading,Descifrar}

      
  return (
    <LoginContext.Provider value={values}>
      {children}
    </LoginContext.Provider>
  )
}


export const useLogin = ()=>{
    const {userData,logIn,logOut,load,loading,Descifrar} = useContext(LoginContext);
    return {userData,logIn,logOut,load,loading,Descifrar}
}

export default LoginProvider
