import React from 'react'
import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { useLogin } from '../../Context/LoginProvider';
import { APICALLER } from '../../Services/api';
//import { functions } from '../../Utils/Functions';

const ReportContext = createContext()

const ReportsProvider = ({children}) => {

    const {userData} = useLogin()
    const {token_user} = userData
    const [loading,setLoading] = useState({
      main:true,
      listaSites:true
    })
    const [listas,setListas] = useState({
      sites:[]
    })

    const getDatas = useCallback(async()=>{
      let res = await APICALLER.get({url:'domains/list',token:token_user});
      if(res.response){
        let results = [] 
        res.results.forEach(e => {
            results.push({...e,id:e.id_domain})
        });
        setListas({sites:results})
    }
      setLoading({main:false,listaSites:false})
    },[token_user])

    const values = {
      listas,loading
    }


    useEffect(() => {
      const ca = new AbortController(); let isActive = true;
      if (isActive) {getDatas();}
      return () => {isActive = false;ca.abort();};
    }, [getDatas]);


  return (
    <ReportContext.Provider value={values}>
      {children}
    </ReportContext.Provider>
  )
}
export const useReports = ()=>{
  const {listas,loading} = useContext(ReportContext)
  return {listas,loading}
}
export default ReportsProvider
