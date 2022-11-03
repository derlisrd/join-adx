import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import { DatePickerCustom } from "../../Components/Mui/DatePickerCustom";
import { useLogin } from "../../Context/LoginProvider";
import { APICALLER } from "../../Services/api";
import { DataGrid } from '@mui/x-data-grid';

const Sites = () => {

  const { userData } = useLogin();

  const [isLoading,setIsLoading] = useState(true)

  const [fechas,setFechas] = useState({
    initial: new Date(),
    final: new Date()
  })

  const [datas, setDatas] = useState({
    dominio:"",
    filter:0
  });

  const [lista,setLista] = useState([])
  const { token_user,network } = userData;
  const getSites = useCallback(async () => {
    setIsLoading(true)
    let res = await APICALLER.get({url:`adunit/${network}`,token:token_user});
    res.response ? setLista(res.results) : console.log(res)
    setIsLoading(false)
  }, [token_user,network]);

  const handleChange = (e) => {
    setDatas({...datas,[e.target.name]:e.target.value})
  };

  const filtrar = ()=>{

  }


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  


  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {
      getSites();
    }
    return () => {isActive = false;ca.abort();};
  }, [getSites]);


  if(isLoading){
    return (<Grid container spacing={2}>
      <Grid item xs={12}><LinearProgress /></Grid>
    </Grid>)
  }

  return (
    <Container maxWidth="lg">
      
      <Grid container spacing={2} justifyItems="center" alignItems="center" mb={4} >
        <Grid item xs={12}>
          <Typography variant="h6">Relatorio de ganhos</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>Dominio</InputLabel>
            <Select
              value={datas.dominio}
              label="Dominio" name="dominio"
              onChange={handleChange}
            >
              <MenuItem value="">Selecione</MenuItem>
              {lista.map((e,i)=>(
                <MenuItem key={i} value={e.domain}>{e.domain}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>Filtrar</InputLabel>
            <Select
              value={datas.filter}
              label="Dominio" name="filter"
              onChange={handleChange}
            >
                <MenuItem value={0}>Selecione</MenuItem>
                <MenuItem value={1}>Hoje</MenuItem>
                <MenuItem value={2}>Ontem</MenuItem>
                <MenuItem value={3}>Mes atual</MenuItem>
                <MenuItem value={4}>Mes anterior</MenuItem>
                <MenuItem value={5}>Data customizada</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {
          datas.filter === 5 &&
          <Grid item xs={12} md={6} >
            <Stack spacing={2} direction="row">
              <DatePickerCustom 
                value={(fechas.initial)}
                label="Data inicial"
                onChange={(d) => { setFechas({...fechas,initial: d.$d})} }
              />
              <DatePickerCustom 
                value={(fechas.final)}
                label="Data final"
                onChange={(d) => { setFechas({...fechas,final: d.$d})} }
              />
            </Stack>
          </Grid>
        }
        <Grid item xs={12} md={2}>
          <Button variant="contained" onClick={filtrar}>Filtrar</Button>
        </Grid>
      </Grid>

        <Grid container spacing={2} >
          <Grid item sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
          </Grid>
        </Grid>


    </Container>
  );
};

export default Sites;
