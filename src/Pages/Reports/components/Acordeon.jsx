import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Icon, LinearProgress } from '@mui/material';
import React from 'react'
import { useReports } from '../ReportsProvider';
import { Box } from '@mui/system';

export default function Acordeon() {
    const {listas,loading} = useReports()
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);

    
  };
  return (
    <Box sx={{ marginTop:2 }}>
       {loading.listaSites ? <LinearProgress  /> :  
      listas.sites.map((e,i)=>(
        <Accordion key={i} expanded={expanded === e.id_domain} onChange={handleChange(e.id_domain)}>
        <AccordionSummary
          expandIcon={<Icon>expand_more</Icon>}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>{e.name}</Typography>
          <Typography sx={{ color: 'text.secondary' }}></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            
          </Typography>
        </AccordionDetails>
      </Accordion>
      ))
      }
    </Box>
  );
}