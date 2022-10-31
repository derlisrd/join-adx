import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
//import ReportsProvider from './ReportsProvider'
import Sites from './Sites'

const Reports = () => {

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
          <Tab label="Todos" />
        </Tabs>
      
      <TabPanel value={tabValue} index={0}>
          <Sites />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>

      </TabPanel>  
    </>
  )
}

export default Reports
