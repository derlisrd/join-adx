import { Divider, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { env } from '../../App/config';
import { useTema } from '../../Context/TemaProvider';
import { listamenu } from '../../Utils/listamenu'


const BP = env.BASE_PATH

const ListaMenu = () => {
  
  const navigate = useNavigate()
  const location = useLocation();  
  const {setTitle} = useTema()

  const navegar = (url,title)=>{
    navigate(BP+url)
    setTitle(title)
  }

  return (
    <>
      <Toolbar>
        <Typography variant="button">Admanager</Typography>
      </Toolbar>
      <Divider />
      <List>
        {listamenu.map((elem, index) => (
          <Fragment key={index}>
          <ListItem  disablePadding selected={location.pathname === elem.url}>
            <ListItemButton onClick={()=>{navegar(elem.url,elem.title)}}>
              <ListItemIcon>
                <Icon>{elem.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={elem.title} />
            </ListItemButton>
          </ListItem>
          { elem.hr && <Divider /> }
          </Fragment>
        ))}
      </List>
    </>
  );
};

export default ListaMenu
