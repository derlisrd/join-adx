import {  Box, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLogin } from "../../Context/LoginProvider";

const UserMenu = () => {
    const {logOut} = useLogin()
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () =>  setAnchorElUser(null);
    
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Menu do usuario">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Icon>account_circle</Icon>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >

        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Icon>logout</Icon>
          </ListItemIcon>
          <ListItemText>Sair</ListItemText>
        </MenuItem>

      </Menu>
    </Box>
  );
};

export default UserMenu;
