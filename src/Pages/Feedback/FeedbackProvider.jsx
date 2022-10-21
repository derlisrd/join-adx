import React from 'react'
import {createContext,useContext,useState,useEffect} from 'react';


const ContextoFeedback = createContext()

export default function FeedbackProvider({children}){

    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) { setLoading(false)}
        return () => {isActive = false;ca.abort();};
      }, []);

    const values = {
        loading
    }

    return(
        <ContextoFeedback.Provider value={values}>
            {children}
        </ContextoFeedback.Provider>
    )
}

export function useFeedback(){
    const  {loading} = useContext(ContextoFeedback)
    return {loading}
}