import React from 'react'
import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { useLogin } from '../../Context/LoginProvider';
import { APICALLER } from '../../Services/api';
import { functions } from '../../Utils/Functions';

const ReportContext = createContext()

const ReportsProvider = () => {

    const [lista,setLista] = useState([])


    const values = {

    }

  return (
    <ReportContext.Provider value={values}>
      
    </ReportContext.Provider>
  )
}

export default ReportsProvider
