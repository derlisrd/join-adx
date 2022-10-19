import {  Avatar, Box, Button, Card, CardActions, CardContent, Fade, Icon, IconButton,  Menu, Stack, Tooltip, Typography, Zoom } from "@mui/material";
import React, { useState } from "react";
import { useLogin } from "../../Context/LoginProvider";
import { useTema } from "../../Context/TemaProvider";

const UserMenu = () => {
    const {logOut,userData} = useLogin()
    const {changeTheme,tema} = useTema()
    const [anchorElUser, setAnchorElUser] = useState({
      user:null,
      notification: null
    });
    const handleOpenUserMenu = (event,name) => {
      setAnchorElUser({...anchorElUser,[name]:event.currentTarget})
    };
    const handleCloseUserMenu = () =>  setAnchorElUser({notification:null,user:null});
  
  return (
    <Box sx={{ flexGrow: 0}}>
      <Tooltip title="Tema">
        <IconButton onClick={changeTheme} sx={{ p: 0,mr:2 }}>
          <Icon color="warning">{tema.mode  === 'light' ? 'wb_sunny' : 'dark_mode'}</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Notificações">
        <IconButton onClick={(e)=>{handleOpenUserMenu(e,'notification')}} sx={{ p: 0,mr:2 }}>
          <Icon>notifications</Icon>
        </IconButton>
      </Tooltip>

      <Tooltip title="Menu do usuario">
        <IconButton onClick={(e)=>{handleOpenUserMenu(e,'user')}}sx={{ p: 0,mr:1 }}>
          <Icon color="primary">account_circle</Icon>
        </IconButton>
      </Tooltip>



      <Menu
        TransitionComponent={Fade}
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser.notification}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser.notification)}
        onClose={handleCloseUserMenu}
      >
        
        <Card sx={{ minWidth: 275, boxShadow:"none" }}  >
          <CardContent>
            
            <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
              <Typography variant="subtitle2" display="block" component="div">Notificações</Typography>
              <Avatar
                alt="Notificações"
                src="https://www.gstatic.com/acx/components/notification/jingles_static.png"
                sx={{ width: 72, height: 72 }}
              />
              <Typography variant="caption" display="block" component="div">Ta em día</Typography>
            </Stack>

          </CardContent>
          <CardActions>
            
          </CardActions>
        </Card>

      </Menu>



      
      <Menu
        TransitionComponent={Zoom}
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser.user}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser.user)}
        onClose={handleCloseUserMenu}
      >
        
        <Card sx={{ minWidth: 275, boxShadow:"none" }}  >
          <CardContent>
            <Stack spacing={2} direction="row">
              <div>
                <Icon sx={{ fontSize: 60 }} color="primary">account_circle</Icon>
              </div>
              <div>
                <Typography variant="subtitle1" display="block">
                  Usuario: {userData.name}
                </Typography>
                <Typography variant="subtitle2" display="block">
                  Network: {userData.network}
                </Typography>
                <Typography variant="body1" display="block">
                  {userData.email}
                </Typography>
              </div>
            </Stack>
          </CardContent>
          <CardActions>
            <Button onClick={logOut} variant="outlined" >Sair</Button>
          </CardActions>
        </Card>

      </Menu>
    </Box>
  );
};

export default UserMenu;
