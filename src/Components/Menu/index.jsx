import { Box, Drawer } from '@mui/material'
import React from 'react'
import { useTema } from '../../Context/TemaProvider'
import ListaMenu from './ListaMenu'

const Menu = () => {

  const {drawerWidth,openMenu,changeStatusMenu} = useTema()


  

  return (
    <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer

          variant="temporary"
          open={openMenu}
          onClose={changeStatusMenu}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <ListaMenu />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <ListaMenu />
        </Drawer>
      </Box>
  )
}

export default Menu
