import { Alert, Box, Checkbox, FormControlLabel, Grid, Icon, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLogin } from "../../Context/LoginProvider";
import styles from '../../Styles/Global.module.css'
import { env } from "../../App/config";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Mui/Loading";

const BP = env.BASE_PATH;


function LoginForm() {
  const navigate = useNavigate()
  const {logIn,userData,load} = useLogin()
  const {login} = userData
  const initialForm = {email:"",password:""}
  const inputPasswordRef = useRef(null)
  const [form,setForm] = useState(initialForm)
  const [showPassword,setShowPassword] = useState('password')
  const [rememberMe,setRememberMe] = useState(false)


  inputPasswordRef.current.setSelectionRange(inputPasswordRef.current.value.length, inputPasswordRef.current.value.length)
  const changeShowPassword = ()=>{
    setShowPassword(showPassword==='password' ? 'text' : 'password')
    inputPasswordRef.current.setSelectionRange(inputPasswordRef.current.value.length, inputPasswordRef.current.value.length)
    inputPasswordRef.current.focus();
    
  }
  const change = e=>{
    const {name,value} = e.target;
    setForm({
      ...form,[name]:value
    })
  }
  const enviar = e =>{ e.preventDefault();logIn(form,rememberMe)}

  const verificar = useCallback(()=>{
    if(login) navigate(BP+"/home")
  },[login,navigate])


  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {verificar();}
    return () => {isActive = false;ca.abort();};
  }, [verificar]);

  if(login){
    return <Loading />
  }

  
  return (
    <div className={styles.centerdiv}>
    <form onSubmit={enviar} >
    <Box boxShadow={3} bgcolor='background.paper' padding={4} borderRadius={5} maxWidth={360}>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <Typography variant="h6" textAlign="center">ENTRAR <Icon color="primary" fontSize="16">rocket_launch</Icon></Typography> 
        </Grid>
        <Grid item xs={12}>
            {load.active && <Alert variant="outlined" icon={false} severity="error">
                {load.msj}
            </Alert>}
        </Grid>
        <Grid item xs={12}>
          <TextField autoFocus fullWidth required label="E-mail" name="email" value={form.email} onChange={change} 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon color="disabled">mail_outline</Icon>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth required type={showPassword} autoComplete="off" label="Password" name="password" value={form.password} onChange={change}
          inputRef={inputPasswordRef} onFocus={(e)=>e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
           InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon color="disabled">lock_open</Icon>
              </InputAdornment>
            ),endAdornment:(
              <InputAdornment position="end">
                <IconButton onClick={changeShowPassword}><Icon>{showPassword==='text' ? `visibility_off` : `visibility`}</Icon></IconButton>
              </InputAdornment>
            )
          }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox checked={rememberMe} onChange={()=>{setRememberMe(!rememberMe)}}  />} label="Lembrar login" />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton fullWidth variant="contained" size="large" type="submit" loading={load.login ? true : false}>
            Login
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
    </form>
    </div>
  );
}

export default LoginForm;
