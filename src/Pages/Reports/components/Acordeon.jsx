import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useLogin } from '../../../Context/LoginProvider'
import { Icon, LinearProgress,Box } from '@mui/material';
import {useState,useCallback} from 'react'
import { APICALLER } from '../../../Services/api'

export default function Acordeon({isLoading,sites}) {
  const [expanded, setExpanded] = useState(false);
  const {userData} = useLogin()
  const [idDomain,setIdDomain] = useState(null)

  const handleChange = (panel) => (e, isExpanded) => {
    if(isExpanded){
      setExpanded(panel)
      setIdDomain(panel)
    }else{
      setExpanded(false);
      setIdDomain(null) 
    }
  }

  
  const getReport = useCallback( async (id)=>{
    if(idDomain){
      let res = await APICALLER.get({token:userData.token_user,url:'domains/list'})
      return res.results 
    }
  },[idDomain])
  
  const {isLoading:loading,data:report} = useQuery(['getsites'], getReport);



  
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
          <LinearProgress />
          <Typography>
            
          </Typography>
        </AccordionDetails>
      </Accordion>
      ))
      }
    </Box>
  );
}