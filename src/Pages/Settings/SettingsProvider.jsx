import React from 'react'
import {createContext,useContext,useState,useCallback,useEffect} from 'react';
import { useLogin } from '../../Context/LoginProvider';
import { APICALLER } from '../../Services/api';

const Contexto = createContext()

const SettingsProvider = ({children}) => {

    const {userData} = useLogin()
    const {token_user} = userData
    const [data,setData] = useState({})    
    const [isLoading,setLoading] = useState(true)
    const [updateState,setUpdateState] = useState({
      message:"",
      active:false
    })
    const update = async(f)=>{
      let res = await APICALLER.update({token:token_user,url:'users/update',body:f})
      if(res.response){
        setUpdateState({message:"Atualizado! ", active:true})
      }
    }

    const getDatas = useCallback(async()=>{
      setLoading(true)
      let res = await APICALLER.get({token:token_user,url:'users/data'})
      if(res.response){
        setData(res.results.data)
      }
      setLoading(false)
    },[token_user])

  useEffect(() => {
      const ca = new AbortController(); let isActive = true;
      if (isActive) { 
          getDatas ()
      }
      return () => {isActive = false;ca.abort();};
    }, [getDatas]);
    
    
    const values = {data,isLoading,update,updateState,setUpdateState}


  return (
    <Contexto.Provider value={values}>
      {children}
    </Contexto.Provider>
  )
}
export const useSettings = ()=>{
    const {loading,data,isLoading,update,updateState,setUpdateState} = useContext(Contexto)
    return {loading,data,isLoading,update,updateState,setUpdateState}
}
export default SettingsProvider
