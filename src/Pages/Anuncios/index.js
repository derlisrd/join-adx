import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"

const Anuncios = () => {
 
  const [tabValue, setTabValue] = useState(0)

    const TabPanel = ({children,index})=>{
      return(
        tabValue === index && (<Box>{children}</Box>)
      )
    }

    return (
      <>
      <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={tabValue}
          onChange={(e, value) => {setTabValue(value);}} centered
        >
          <Tab label="Por site" />
          <Tab label="Por bloco de anúncio" />
          <Tab label="Configurações globais" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>

        </TabPanel>
  
        <TabPanel value={tabValue} index={1}>

        </TabPanel>  
      </>
    )
}

export default Anuncios
