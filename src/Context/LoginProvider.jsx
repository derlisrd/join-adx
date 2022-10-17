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
        remember:false,
        token_user:null,
        id_user:null,
        nombre_user:null,
        rol_user:null,
        username_user:null
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
            id_user:null,
            nombre_user:null,
            rol_user:null,
            username_user:null,
            remember:false});
        localStorage.removeItem("userData");
        sessionStorage.removeItem("userData");

    },[])

    const logIn = async(f,remember)=>{
        setLoad({login:true,active:false,msj:null});
        let promise = await Promise.all([APICALLER.login(f)]);
        let res = promise[0];
        
        if(res.response && res.found>0){
            setearLogin(res.results[0])
        }
        else{
            console.log(res);
            setLoad({login:false,active:true,msj:res.message});
        }
    }


    const verificar = useCallback(async()=>{
        setLoading(true);
        if (userData.login) {
            let res = await APICALLER.validateToken(userData.token_user);
            if (res.found > 0 && res.response) {
                
            }else{
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
          ca.abort();
        };
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
