import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { APICALLER } from '../Services/api';
import {  env } from "../App/config";
import CryptoJS from "crypto-js";
import { APICALLER_FIREBASE } from '../Services/apifirebase';

const LoginContext = createContext()

const LoginProvider = ({children}) => {

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
        name:"",
        token_user:null,
        email:null,
        remember:false,
        network:"",
        id:"",
        uid:null
    }
    const [userData,setUserData] = useState( storage ?? initialUserData);    
    
    
    
    const setearLogin = (f,remember)=>{
        setUserData(f);
        sessionStorage.setItem("userData", JSON.stringify(f))
        if(remember){
            localStorage.setItem("userData", JSON.stringify(f))
        } 
    }


    const logOut = useCallback(async()=>{
        
        setUserData({
            login:false,
            name:"",
            token_user:null,
            email:null,
            remember:false,
            network:"",
            id:"",
            uid:null
        });
        localStorage.removeItem("userData");
        sessionStorage.removeItem("userData");
        await APICALLER_FIREBASE.logout()
    },[])


    const logIn = async(f,remember)=>{
        setLoading(true)
        setLoad({login:true,active:false,msj:null});
        let promise = await Promise.all([APICALLER.login(f)]);
        let res = promise[0];
        if(res.response){
            let resp = await APICALLER.validateToken(res.results.token);
            
            let resfirebase = await APICALLER_FIREBASE.login({email:f.email,password:f.password})
            if(!resfirebase.response){
                resfirebase = await APICALLER_FIREBASE.register({email:f.email,password:f.password})
            }
            

            setearLogin({
                login:true,
                token_user: CifrarTexto( res.results.token ),
                email:f.email,
                remember:remember,
                name:resp.results.name,
                network:resp.results.network,
                id:resp.results.id,
                uid:resfirebase.results.uid
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
            //console.log(res)
            if (!res.response){
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
