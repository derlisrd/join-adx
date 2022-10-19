import {
  Button,
  Collapse,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTema } from "../../Context/TemaProvider";
import { listamenu } from "../../Utils/listamenu";
import styles from '../../Styles/Global.module.css'
import useGoto from "../../Hooks/useGoto";

//const BP = env.BASE_PATH;

const ListaMenu = () => {
  const navigate = useGoto();
  const location = useLocation();
  const { setTitle, changeStatusMenu } = useTema();
  const [lista, setLista] = useState(listamenu);

  const switchOpen = (sw, id) => {
    let array = [...lista];
    let index = array.findIndex((e) => e.id === id);
    array[index].open = !sw;
    setLista(array);
  };

  const goTo = () => {changeStatusMenu(false);}

  const navegar = (url, title) => {
    navigate.to(url);
    setTitle(title);
    goTo()
  };

  return (
    <>
      <Toolbar>
        <Button fullWidth onClick={()=>{ navegar('','Página principal')}} startIcon={<Icon>rocket_launch</Icon>}>ADMANAGER</Button>
      </Toolbar>
      <Divider />
      <List component="nav">
        {listamenu.map((elem, index) => (
          <Fragment key={index}>
            {elem.sub ? (
              <>
                <ListItem button onClick={() => switchOpen(elem.open, elem.id)}>
                  <ListItemIcon>
                    <Icon color="inherit">{elem.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={elem.title} />
                  <Icon color="inherit">
                    {elem.open ? `expand_more` : `chevron_right`}
                  </Icon>
                </ListItem>
                <Collapse in={elem.open} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    className={styles.submenu}
                  >
                    {elem.submenu.map((el, i) => (
                      <ListItem
                        key={i}
                        selected={location.pathname === el.url}
                        button
                        component={Link}
                        to={el.url}
                        onClick={goTo}
                      >
                        <ListItemIcon>
                          <Icon
                            color={
                              el.url === location.pathname
                                ? "primary"
                                : "inherit"
                            }
                          >
                            {el.icon}
                          </Icon>
                        </ListItemIcon>
                        <ListItemText
                          primary={el.title}
                          className={
                            el.url === location.pathname ? styles.selected : null
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <Fragment key={index}>
                <ListItem
                  disablePadding
                  selected={location.pathname === elem.url}
                >
                  <ListItemButton
                    onClick={() => {
                      navegar(elem.url, elem.title);
                    }}
                  >
                    <ListItemIcon>
                      <Icon>{elem.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={elem.title} />
                  </ListItemButton>
                </ListItem>
                {elem.hr && <Divider />}
              </Fragment>
            )}
          </Fragment>
        ))}
      </List>
    </>
  );
};

export default ListaMenu;
