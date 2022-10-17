import { Box, Toolbar } from '@mui/material'
import React from 'react'
import Menu from '../Components/Menu'
import AppBarMenu from '../Components/Menu/AppBarMenu'
import { useTema } from '../Context/TemaProvider'

const MainPages = ({children}) => {

    const {drawerWidth} = useTema()

  return (
    <Box sx={{ display: 'flex' }}>
        <AppBarMenu />
        <Menu />
        <Box component="main" sx={{ flexGrow: 1, p:1, mt:1, width: { sm: `calc(100% - ${drawerWidth}px)` } }} >
          <Toolbar />
            {children}
        </Box>
    </Box>
  )
}

export default MainPages
