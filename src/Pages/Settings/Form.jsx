import {  Alert, Box, Button, Container, Grid, LinearProgress, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import TitleFormGroup from './components/TitleFormGroup'
import { useSettings } from './SettingsProvider'

const Form = () => {

    const {data,isLoading,update,updateState,setUpdateState} = useSettings()
    const [form,setForm] = useState({
        whatsapp :"",
        name:"",
        email:"",
        cep:"",
        pix:"",  
        endereco:"",
    })


    const change = e =>{
        const {name,value } = e.target
        setForm({...form,[name]:value})
    }

    

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) { 
            setForm({
                whatsapp :data.whatsapp ?? '',
                name:data.name ?? '',
                email:data.email ?? '',
                cep:data.cep ?? '',
                pix:data.pix ?? '',  
                endereco:data.endereco ?? '',
            })
        }
        return () => {isActive = false;ca.abort();};
      }, [data]);


  return (
    <Container maxWidth="lg">
        <Snackbar open={updateState.active} autoHideDuration={4000} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} onClose={()=>{setUpdateState({active:false})}}>
            <Alert icon={false} onClose={()=>{ setUpdateState({active:false}) } } severity="success" sx={{ width: '100%' }}>
                <Typography variant='overline'>{updateState.message}</Typography>
            </Alert>
        </Snackbar>
        { isLoading ? <LinearProgress /> :  
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Typography variant='h6'>Dados</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Box boxShadow={2} p={3} borderRadius={2}>
                    <Stack spacing={3}>
                        <TitleFormGroup icon="account_circle" title="Dados de usuario" />
                        <TextField size='large' fullWidth label="Nome" onChange={change} name="name" variant="standard" value={form?.name}  />
                        <TextField size='large' fullWidth label="Email"   variant="standard" disabled value={form?.email}  />
                    </Stack>
                </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <Box boxShadow={2} p={3} borderRadius={2}>
                    <Stack spacing={3}>
                        <TitleFormGroup icon="account_balance" title="Dados de pagamento" />
                        <TextField size='large' label="PIX" onChange={change} variant="standard" fullWidth name="pix" value={form?.pix}  />
                    </Stack>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Box boxShadow={2} p={3} borderRadius={2}>
                    <Stack spacing={3}>
                        <TitleFormGroup icon="phone" title="Contato" />
                        <TextField size='large' label="Whatsapp" variant="standard" onChange={change} fullWidth name="whatsapp" value={form?.whatsapp}  />
                        <TextField size='large' label="Endereço" variant="standard" onChange={change} fullWidth name="endereco" value={form?.endereco}  />
                        <TextField size='large' label="Cep" variant="standard" onChange={change} fullWidth name="cep" value={form?.cep}  />
                    </Stack>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Button variant='contained' onClick={()=>{update(form)}} size='large'>Guardar</Button>
            </Grid>
        </Grid>
        }
    </Container>
  )
}

export default Form
