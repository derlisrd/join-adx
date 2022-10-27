import React from 'react'
import {createContext,useContext} from 'react';
import { useQuery } from 'react-query';
import { useLogin } from '../../Context/LoginProvider';
import { APICALLER } from '../../Services/api';

const Contexto = createContext()

const SettingsProvider = ({children}) => {

    const {userData} = useLogin()
    const {token_user} = userData
    

    const {isLoading,data} =  useQuery('user_data', async () => {
        let res = await APICALLER.get({token:token_user,url:'users/data'})
        if(res.response){
            return (res.results.data)
        }
    })


      const values = {
        data,isLoading
      }


  return (
    <Contexto.Provider value={values}>
      {children}
    </Contexto.Provider>
  )
}
export const useSettings = ()=>{
    const {loading,data,isLoading} = useContext(Contexto)
    return {loading,data,isLoading}
}
export default SettingsProvider
