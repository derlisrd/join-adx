import { createTheme,ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {createContext,useContext,useState,useEffect,useCallback} from 'react';


const Contexto = createContext()

const TemaProvider = ({children})=>{

    const drawerWidth = 240;
    const [title,setTitle] = useState('Página principal');
    const [temaMode,setTemaMode] = useState('light');
    const [openMenu,setOpenMenu] = useState(false)
    const changeStatusMenu = ()=>{setOpenMenu(!openMenu)}

    const tema = createTheme({
        palette: {
          mode: temaMode,
        },
        components:{
          MuiListItem:{
            styleOverrides:{
              root:{
                borderRadius:"10px",
                transition:'all 0.02s linear',
                "&.Mui-selected":{
                  backgroundColor: 'primary.light',
                  "& span":{
                    /* fontWeight:"bold", */
                    color:'primary.main'
                  }
                },
                "&:hover": {
                  backgroundColor:'primary.light',
                  "& span":{
                    color:'primary.main'
                    /* fontWeight:"bold", */
                  }
                },
            },
          },
        }, 
        },
        typography: {
          fontSize: 14,
          fontWeightMedium:"bold",
          fontWeightRegular:"500",
          fontFamily:"Montserrat",
          caption:{
            fontSize:13,
          },
          body1:{
            fontSize:14
          },
          h5:{
            fontWeight:"bold"
          }
          
        },
      });


    const values = {
        drawerWidth,changeStatusMenu,openMenu,title,setTitle,temaMode,setTemaMode
    }

    return(
        <Contexto.Provider value={values}>
            <ThemeProvider theme={tema}>
              <CssBaseline />
            {children}
            </ThemeProvider>
        </Contexto.Provider>
    )
}


export const useTema = ()=>{
    const {drawerWidth,changeStatusMenu,openMenu,title,setTitle,temaMode,setTemaMode} = useContext(Contexto)
    return {drawerWidth,changeStatusMenu,openMenu,title,setTitle,temaMode,setTemaMode}
}

export default TemaProvider