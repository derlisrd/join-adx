import { createTheme,ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {createContext,useContext,useState,useEffect} from 'react';
import {colores} from "../App/colores.js"

const Contexto = createContext()

const TemaProvider = ({children})=>{

  
    const localStorageTema = JSON.parse(localStorage.getItem("tema"))
    const [tema,setTema] = useState({
      defaultColor: localStorageTema?.defaultColor || "watergreen", //referencia a key del objeto
      mode:localStorageTema?.mode || "light",
      colors:localStorageTema?.color || "watergreen",
      currentColor: localStorageTema?.currentColor || colores["watergreen"].primary.main, //hace referencia al oclor hexadecimal
      fontSize: {
        general: localStorageTema?.fontSize.general || 14,
        menu: localStorageTema?.fontSize.menu || 12
      }
    })
    const colorText = tema.mode==='light' ? "#4e4d4d" : "#fff";
    const PaperBgColor = tema.mode==='light' ? "#fff" : "#212b36";
    const DefaultBgColor = tema.mode==='light' ? "#f9f9f9" : "#161c24";

    const drawerWidth = 270;
    const [title,setTitle] = useState('');
    

    const [openMenu,setOpenMenu] = useState(false)
    const changeStatusMenu = ()=>{setOpenMenu(!openMenu)}

    const changeColor = cor =>{
      let json = {...tema,defaultColor:cor,currentColor: colores[cor].primary.main,colors:cor}
      localStorage.setItem("tema",JSON.stringify(json));
      setTema(json);
    }

    const changeFont = (font,size)=>{
      let json = {...tema}
      json.fontSize[font] = parseInt(size);
      localStorage.setItem("tema",JSON.stringify(json));
      setTema(json);
    }

    

    const changeTheme = ()=>{
      let newMode = tema.mode==="light" ? "dark" : "light";
      let json = {...tema,mode:newMode}
      localStorage.setItem("tema",JSON.stringify(json));
      setTema(json)
    }
    

    const theme = createTheme({        
        palette: {
          mode: tema.mode==='light' ? "light" : "dark",
          background:{
            paper:PaperBgColor,
            default:DefaultBgColor,
            blueSky: "#50a7fd"
          },
          primary:{
            light:colores[tema.colors].primary.light,
            main:colores[tema.colors].primary.main,
            dark:colores[tema.colors].primary.dark,
            contrastText:colores[tema.colors].primary.contrastText
          },
          secondary: {
            light: colores[tema.colors].secondary.light,
            main: colores[tema.colors].secondary.main,
            dark: colores[tema.colors].secondary.dark,
            contrastText:colores[tema.colors].secondary.contrastText
          },

          colorText:colorText,
        },
        
        typography: {
          fontSize: parseInt(tema.fontSize.general),
          fontWeightMedium:"bold",
          fontWeightRegular:"500",
          fontFamily:"Montserrat",
          caption:{
            fontSize:12,
          },
          body1:{
            fontSize:14
          },
          h5:{
            fontWeight:"bold"
          }
          
        },
        components:{
          MuiTableCell:{
            styleOverrides:{
              root:{
                color:colorText,
              }
            }
          },
          MuiTypography:{
            defaultProps:{
              color:colorText,
            }
          },
          MuiLink: {
            defaultProps: {
              
            },
          },
          MuiCard:{
            styleOverrides:{
              root:{
                borderRadius:"12px",
                boxShadow:"7px 6px 8px 1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 3px 3px 3px 0px rgb(0 0 0 / 12%)"
              }
            }
          },
          MuiPaper:{
            styleOverrides:{
              root:{
                transition:'all 0.2s',
                backgroundColor:PaperBgColor,
                backgroundImage:"none"
              },
              
            }
          },
          MuiDrawer:{
            styleOverrides:{
              root:{
                
              }
            }
          },
          MuiButton:{
            styleOverrides:{
              root:{
                borderRadius:"8px"
              }
            }
          },
          MuiOutlinedInput:{
            styleOverrides:{
              root:{
                borderRadius:"8px",
              }
            }
          },
        MuiList:{
          styleOverrides:{
            root:{
              
            }
          }
        },
        MuiListItemIcon:{
            styleOverrides:{
              root:{
                "& span":{
                  //fontSize:tema.fontSize.menu
                },
            },
          },
        },
        MuiListItemText:{
          styleOverrides:{
            root:{
              "& span":{
                fontSize:tema.fontSize.menu,
                fontWeight:"bold"
              }
          },
          },
        },
        MuiListItemButton:{
          styleOverrides:{
            root:{
              "&:hover": {
                borderRadius:"0 18px 18px 0",
              },
            }
          }
        },
        MuiListItem:{
            styleOverrides:{
              root:{
                borderRadius:"0 18px 18px 0",
                transition:'all 0.02s linear',
                "&.Mui-selected":{
                  backgroundColor: tema.mode==="light"? colores[tema.colors].primary.light : colores[tema.colors].primary.ligth,
                  "& span":{
                    /* fontWeight:"bold", */
                    color:tema.mode==="light"? colores[tema.colors].primary.main : colorText,
                  },
                  borderLeft:`4px solid ${colores[tema.colors].primary.main}`,
                  
                },
                "&:hover": {
                  backgroundColor:colores[tema.colors].primary.light,
                  "& span":{
                    color:tema.mode==="light"? colores[tema.colors].primary.main : colorText,
                    /* fontWeight:"bold", */
                  }
                },
            },
          },
        }, 


          MuiCssBaseline:{
            styleOverrides:{
              body: {
                margin:0,
                padding:0,
                boxSizing:"border-box",
                background:DefaultBgColor,
                transition:'all 0.2s',
              },
              "::-webkit-scrollbar": {width: "8px"},
              "::-webkit-scrollbar-track": {background: "none"},
              "::-webkit-scrollbar-thumb": {backgroundColor: "rgba(99, 115, 129, 0.48)",borderRadius:"3px"},
              "::-webkit-scrollbar-thumb:hover": {backgroundColor: "rgba(99, 115, 129, 0.48)"}
            }
          }
        }
      });

      
      
      const verifica = ()=>{
        const local = JSON.parse(localStorage.getItem("tema"));
        if(local){
          setTema(local)
        }
        else{
          let json = JSON.stringify({
            defaultColor: "watergreen",
            mode:"light",
            colors:"watergreen",
            currentColor: colores["watergreen"].primary.main,
            fontSize: {
              general: 14,
              menu:13
            }
          })
          localStorage.setItem("tema",json);
        }
      }
      const values = {
        drawerWidth,changeStatusMenu,openMenu,title,setTitle,changeColor,changeFont,changeTheme,tema
      }
    
      useEffect(() => {
        verifica();
      }, [])


    

    return(
        <Contexto.Provider value={values}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
            {children}
            </ThemeProvider>
        </Contexto.Provider>
    )
}


export const useTema = ()=>{
    const {drawerWidth,changeStatusMenu,openMenu,title,setTitle,changeColor,changeFont,changeTheme,tema} = useContext(Contexto)
    return {drawerWidth,changeStatusMenu,openMenu,title,setTitle,changeColor,changeFont,changeTheme,tema}
}

export default TemaProvider