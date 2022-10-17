import { Box, Button, Grid, Icon, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLogin } from "../../Context/LoginProvider";
import styles from '../../Styles/Global.module.css'
import { env } from "../../App/config";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Mui/Loading";

const BP = env.BASE_PATH;


function LoginForm() {
  const navigate = useNavigate()
  const {logIn,userData} = useLogin()
  const {login} = userData
  const initialForm = {email:"",password:""}
  const [form,setForm] = useState(initialForm)
  const change = e=>{
    const {name,value} = e.target;
    setForm({
      ...form,[name]:value
    })
  }
  const enviar = e =>{ e.preventDefault();logIn(form)}

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
          <Icon color="primary" fontSize="16">rocket_launch</Icon>
        </Grid>
        <Grid item xs={12} >
          <Typography variant="h6">ENTRAR</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField autoFocus fullWidth required label="E-mail" name="email" value={form.email} onChange={change} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth required label="Password" name="password" value={form.password} onChange={change} />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" size="large" type="submit" >Login</Button>
        </Grid>
      </Grid>
    </Box>
    </form>
    </div>
  );
}

export default LoginForm;
