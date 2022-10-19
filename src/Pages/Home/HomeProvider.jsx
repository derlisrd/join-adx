import React from 'react'
import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { useLogin } from '../../Context/LoginProvider';
import { APICALLER } from '../../Services/api';
import { functions } from '../../Utils/Functions';

const HomeContext = createContext()


const HomeProvider = ({children}) => {

    const {userData} = useLogin()
    const {token_user} = userData
    const {todayDMY,firstdaymonthDMY} = functions;

    const [loading,setLoading] = useState(true)
    const initialDatas = {
      impressions:0,
      ecpm:0,
      clicks:0,
      view_ability:0,
      revenue:0
    }
    const [data,setData] = useState(initialDatas)
    
    
    const getDatas = useCallback(async()=>{
      
        let fecha = `${firstdaymonthDMY()}/${todayDMY()}`
        let res =  await APICALLER.get({url:`revenue/${fecha}`,token:token_user})
        if(res.response){
          let info = {
            impressions:0,
            ecpm:0,
            clicks:0,
            view_ability:0,
            revenue:0
          }, count = 1;
          res.results.forEach(e => {
            info.impressions += e.impressions
            info.clicks += e.clicks
            info.view_ability += e.view_ability
            info.revenue += e.revenue
            info.ecpm += e.ecpm
            count ++
          });
          info.ecpm = ((info.ecpm) / count).toFixed(2)
          setData(info)
        }
        setLoading(false)
    },[todayDMY,firstdaymonthDMY,token_user])
    
    console.log(data)

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {
          getDatas();
        }
        return () => {
          isActive = false;
          ca.abort();
        };
      }, [getDatas]);

    const values = {
        loading,data
    }

  return (
    <HomeContext.Provider value={values}>
      {children}
    </HomeContext.Provider>
  )
}

export function useHome(){
    const {loading,data} = useContext(HomeContext)
    return {loading,data}
}

export default HomeProvider
