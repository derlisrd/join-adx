import React from 'react'
import {createContext,useContext,useState,useEffect,useCallback} from 'react';

const HomeContext = createContext()


const HomeProvider = ({children}) => {

    const [loading,setLoading] = useState(true)

    const getDatas = useCallback(()=>{
        setLoading(false)
    },[])
    

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
        loading
    }

  return (
    <HomeContext.Provider value={values}>
      {children}
    </HomeContext.Provider>
  )
}

export function useHome(){
    const {loading} = useContext(HomeContext)
    return {loading}
}

export default HomeProvider
