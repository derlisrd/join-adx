import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { useLogin } from '../../Context/LoginProvider';
import { APICALLER } from '../../Services/api';

const Contexto = createContext();


export default function SitesProvider({children}){

    const {userData} = useLogin()
    const {token_user,network} = userData
    const [loading,setLoading] = useState(true)
    const [lista,setLista] = useState([])


    const getDatas = useCallback(async()=>{
        setLoading(true);
        //let av = await APICALLER.get({url:'adunit/'+network,token:token_user})
        
        //let res = await APICALLER.get({url:'domains/list',token:token_user});
        let res = await APICALLER.get({url:`adunit/${network}`,token:token_user});

        if(res.response){
            let results = [] 
            res.results.forEach(e => {
                results.push({...e,id:e.id_site})
            });
            setLista(results)
        }
        
        setLoading(false)
    },[token_user,network])

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getDatas();}
        return () => {isActive = false;ca.abort();};
      }, [getDatas]);


    const values = {
        lista,loading
    }

    return(
        <Contexto.Provider value={values}>
            {children}
        </Contexto.Provider>
    )
}

export function useSites(){
    const {lista,loading} = useContext(Contexto)
    return{lista,loading}
}