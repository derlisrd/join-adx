import React from 'react'
import AppBar from '@mui/material/AppBar';
import { Icon, IconButton, Toolbar, Typography } from '@mui/material';
import { useTema } from '../../Context/TemaProvider';
import UserMenu from './UserMenu';


const AppBarMenu = () => {

  const {changeStatusMenu,drawerWidth,title} = useTema()

  return (
  <AppBar color='default'
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={changeStatusMenu}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="button" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <UserMenu />
        </Toolbar>
      </AppBar>
  )
}

export default AppBarMenu
