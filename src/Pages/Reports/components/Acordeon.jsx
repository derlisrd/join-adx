import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useLogin } from '../../../Context/LoginProvider'
import { Icon, LinearProgress,Box } from '@mui/material';
import {useState} from 'react'
import { APICALLER } from '../../../Services/api'
import { functions } from '../../../Utils/Functions';
//import { useQuery } from 'react-query';

export default function Acordeon({isLoading,sites}) {
  const [expanded, setExpanded] = useState(false);
  const {todayDMY} = functions;
  const {userData} = useLogin()
  const {token_user} = userData
  const [loading,setLoading] = useState(false)
  //const [idDomain,setIdDomain] = useState(null)
  const [datas,setDatas] = useState({})
  const dateToday = `${todayDMY()}/${todayDMY()}`
  
  const handleChange = (panel) => async(e, isExpanded) => {
    if(isExpanded){
      setExpanded(panel)
      //setIdDomain(panel)
        setLoading(true)
        let res = await APICALLER.get({token:token_user,url:`rpm/${dateToday}/${panel}`})
        if(res.response){
          setDatas(res.results)
        }
        setLoading(false)
    }else{
      setExpanded(false);
      //setIdDomain(null) 
    }
  }
  
  
 /*  const getReport = useCallback( async (id)=>{
    if(idDomain){
      setLoading(true)
      let res = await APICALLER.get({token:token_user,url:'rpm/31-10-2022/31-10-2022/'+idDomain})
      if(res.response){
        setDatas(res.results)
      }
      setLoading(false)
    }
  },[idDomain,token_user])

  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {getReport();}
    return () => {isActive = false;ca.abort();};
  }, [getReport]); */
  
  

  
  return (
    <Box sx={{ marginTop:2 }}>
       {isLoading ? <LinearProgress  /> :  
      sites.map((e,i)=>(
        <Accordion key={i} expanded={expanded === e.id_domain} onChange={handleChange(e.id_domain)}>
        <AccordionSummary
          expandIcon={<Icon>expand_more</Icon>}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>{e.name}</Typography>
          <Typography sx={{ color: 'text.secondary' }}></Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
          loading &&
          <LinearProgress />
          }
          <Typography variant='subtitle2'>
            Impressions: {datas?.impressions ?? 0}
          </Typography>
          <Typography variant='subtitle2'>
            Visitas: {datas?.visits ?? 0}
          </Typography>
        </AccordionDetails>
      </Accordion>
      ))
      }
    </Box>
  );
}