import {  Box, Button, Container, Grid, Icon, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSettings } from './SettingsProvider'

const Form = () => {

    const {data,isLoading} = useSettings()
    const [form,setForm] = useState({})





    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) { 
            setForm(data)
        }
        return () => {isActive = false;ca.abort();};
      }, [data]);


  return (
    <Container maxWidth="lg">
        { isLoading ? <LinearProgress /> :  
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Typography variant='h6'>Dados</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Box boxShadow={2} p={3} borderRadius={2}>
                    <Stack spacing={3}>
                        <Icon color="primary">account_circle</Icon>
                        <TextField size='large' fullWidth label="Nome" variant="standard" value={form?.name}  />
                        <TextField size='large' fullWidth label="Email" variant="standard" disabled value={form?.email}  />
                    </Stack>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Box boxShadow={2} p={3} borderRadius={2}>
                    <Stack spacing={3}>
                        <Icon color="primary">lock</Icon>
                        <TextField size='large' fullWidth label="Password" variant="standard" value={form?.name}  />
                        <TextField size='large' fullWidth label="Password novo" variant="standard" value={form?.email}  />
                    </Stack>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Button variant='contained' size='large'>Guardar</Button>
            </Grid>
        </Grid>
        }
    </Container>
  )
}

export default Form
