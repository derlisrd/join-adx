import React from 'react'
import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { useLogin } from '../../Context/LoginProvider';
import { APICALLER } from '../../Services/api';
import { functions } from '../../Utils/Functions';

const HomeContext = createContext()


const HomeProvider = ({children}) => {

    const {userData} = useLogin()
    const {token_user,network} = userData
    const {todayDMY,firstdaymonthDMY,yesterdayDMY,lastsevendays,firstDay,fechaDMY} = functions;
    const [fechas,setFechas] = useState({
      initial: firstDay(),
      final: new Date()
    })
    const [sites,setSites] = useState([])
    const [domain,setDomain] = useState({})
    const [loading,setLoading] = useState(true)
    const initialDatas = {
      lastseven_revenue:0,
      month_impressions:0,
      month_ecpm:0,
      month_clicks:0,
      month_view_ability:0,
      month_revenue:0,
      month_count:1,
      yesterday_impressions:0,
      yesterday_ecpm:0,
      yesterday_clicks:0,
      yesterday_view_ability:0,
      yesterday_revenue:0,
      yesterday_count:0,
      today_impressions:0,
      today_ecpm:0,
      today_clicks:0,
      today_view_ability:0,
      today_revenue:0,
      today_ctr:0,
      today_count:0
    }
    const [data,setData] = useState(initialDatas)
    
    const filtrar = useCallback(async()=>{
      let fechaInitial = fechaDMY(fechas.initial), fechaFinal = fechaDMY(fechas.final);
      let dateMonth = `${fechaInitial}/${fechaFinal}`
      console.log(dateMonth)
    },[fechas,fechaDMY])

    const getDatas = useCallback(async()=>{
        let dateMonth = `${firstdaymonthDMY()}/${todayDMY()}`
        let dateToday = `${todayDMY()}/${todayDMY()}`
        let dateYesterday = `${yesterdayDMY()}/${yesterdayDMY()}`
        let dateLastSevenday = `${lastsevendays()}/${todayDMY()}`
        let promises = await Promise.all([
          APICALLER.get({url:`revenue/${dateMonth}`,token:token_user}),
          APICALLER.get({url:`revenue/${dateToday}`,token:token_user}),
          APICALLER.get({url:`revenue/${dateYesterday}`,token:token_user}),
          APICALLER.get({url:`revenue/${dateLastSevenday}`,token:token_user}),
          APICALLER.get({url:`adunit/${network}`,token:token_user})
        ])
        let resMonth = promises[0], resYesterday = promises[2], resToday = promises[1], resLastSevenDay = promises[3], resSites = promises[4];
       setSites(resSites.results)
       if(resSites.first.id_site) {
          //4553
          let rpm = await APICALLER.get({url:`rpm/${dateToday}/${resSites.first?.id_site}`,token:token_user})
            rpm.response ? setDomain(rpm.first) : console.log(rpm) 
        } 
        //console.log(resToday,resMonth)
        if(resMonth.response){
          let info = {
            lastseven_revenue:0,
            month_impressions:0,
            month_ecpm:0,
            month_clicks:0,
            month_view_ability:0,
            month_revenue:0,
            month_count:1,
            yesterday_impressions:0,
            yesterday_ecpm:0,
            yesterday_clicks:0,
            yesterday_view_ability:0,
            yesterday_revenue:0,
            yesterday_count:0,
            today_impressions:0,
            today_ecpm:0,
            today_clicks:0,
            today_view_ability:0,
            today_revenue:0,
            today_ctr:0,
            today_count:0
          }

          resMonth.results.forEach(e => {
            info.month_impressions += e.impressions
            info.month_clicks += e.clicks
            info.month_view_ability += e.view_ability
            info.month_revenue += e.revenue
            info.month_ecpm += parseFloat(e.ecpm)
            info.month_count += 1
          });

          resToday.results.forEach(e => {
            info.today_impressions += e.impressions
            info.today_clicks += e.clicks
            info.today_view_ability += e.view_ability
            info.today_revenue += e.revenue
            info.today_ecpm += parseFloat(e.ecpm)
            info.today_count += 1
          });
          resYesterday.results.forEach(e => {
            info.yesterday_impressions += e.impressions
            info.yesterday_clicks += e.clicks
            info.yesterday_view_ability += e.view_ability
            info.yesterday_revenue += e.revenue
            info.yesterday_ecpm += parseFloat(e.ecpm)
            info.yesterday_count += 1
          });

          resLastSevenDay.results.forEach(e => {
            info.lastseven_revenue += e.revenue
          });

          info.month_ecpm = (parseFloat(info.month_ecpm) / info.month_count).toFixed(2)
          info.yesterday_ecpm = (parseFloat(info.yesterday_ecpm) / info.yesterday_count).toFixed(2)
          info.today_ecpm = (parseFloat(info.today_ecpm) / info.today_count).toFixed(2)
          
          info.today_ctr = (info.today_clicks / info.today_impressions ) * 100
          info.today_ctr = isNaN(info.today_ctr) ? 0  : (info.today_ctr).toFixed(2)
          setData(info)
        }
        setLoading(false)
    },[todayDMY,firstdaymonthDMY,token_user,yesterdayDMY,lastsevendays,network])
    
  
   

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getDatas();}
        return () => {isActive = false;ca.abort();};
      }, [getDatas]);
    
      const values = {
        loading,data,domain,sites,fechas,setFechas,filtrar
    }

  return (
    <HomeContext.Provider value={values}>
      {children}
    </HomeContext.Provider>
  )
}

export function useHome(){
    const {loading,data,domain,sites,fechas,setFechas,filtrar} = useContext(HomeContext)
    return {loading,data,domain,sites,fechas,setFechas,filtrar}
}

export default HomeProvider
