import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid,  LinearProgress, Stack,  Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useHome } from "./HomeProvider";
import MessagesImg from '../../Assets/img/messages.png'
import Analytics from '../../Assets/img/analytics.png'
import AppImg from '../../Assets/img/app.png'
import Performance from '../../Assets/img/performance.png'
import useGoto from "../../Hooks/useGoto";
import { functions } from "../../Utils/Functions";
import { DatePickerCustom } from "../../Components/Mui/DatePickerCustom";

const Dashboard = () => {
  const { loading,data,domain,fechas,setFechas,filtrar } = useHome();
  const navigate = useGoto()
  if (loading) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      </Grid>
    );
  }

console.log()
  return (

    <Container maxWidth="lg">
    <Grid container spacing={2}>
    <Grid item xs={12} sm={12} >
      
    </Grid>
    <Grid item xs={12} sm={12} >
    <Stack spacing={2} direction="row">
      <DatePickerCustom
      value={(fechas.initial) }
      label="Data inicial"
      onChange={(d) => {setFechas({ ...fechas, initial: functions.fechaDMY( d ) });}}
      />
      <DatePickerCustom
      value={(fechas.final)}
      label="Data final"
      onChange={(d) => {
        let date = (new Date(d))
        console.log(date.getDate(),date.getMonth()+1,date.getFullYear())
      }}
      />
      <Button onClick={filtrar}>Filtrar</Button>
    </Stack>
    </Grid>
      <Grid item xs={12} sm={12} >
        <Box
          bgcolor='primary.light'
          boxShadow={2}
          padding={3}
          borderRadius={2}
          height="100%"
        >
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <Typography variant="h6">Ganhos estimados</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} item>
              <Typography variant="body1">Hoje, até o momento</Typography>
              <Typography variant="h6">{data.today_revenue.toFixed(2)} US$</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} item>
              <Typography variant="body1">Ontem</Typography>
              <Typography variant="h6">{data.yesterday_revenue.toFixed(2)} US$</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} item>
              <Typography variant="body1">Últimos 7 días</Typography>
              <Typography variant="h6">{functions.numberFormat((data.lastseven_revenue).toFixed(2))} US$</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} item>
              <Typography variant="body1">Este mes</Typography>
              <Typography variant="h6">{(data.month_revenue).toFixed(2)} US$</Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
          <Card >
            <CardMedia
              component="img"
              height="180"
              image={Analytics}
              alt="saldo"
            />
            <CardContent>
            <Typography variant="h6">Saldo {functions.getMonthString(fechas.initial)}</Typography>
            <Typography variant="body1"> Hoje, até o momento</Typography>
            <Typography variant="h6"> {(data.month_revenue).toFixed(2)} US$</Typography>
            </CardContent>
          </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={3}>
        <Card >
            <CardMedia
              component="img"
              height="180"
              image={Performance}
              alt="saldo"
            />
            <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={6}>
              <Typography variant="body1">Impressoes</Typography>
              <Typography variant="h6">{data.today_impressions}</Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography variant="body1">eCPM</Typography>
              <Typography variant="h6">{isNaN(data.today_ecpm) ? 0 : data.today_ecpm} Us$</Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography variant="body1">Cliques</Typography>
              <Typography variant="h6">{data.today_clicks}</Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography variant="body1">CTR</Typography>
              <Typography variant="h6">{data.today_ctr} % </Typography>
            </Grid>
          </Grid>
          </CardContent>
          <CardActions>
              <Button onClick={()=>{navigate.to('/reports')}}>Ver relatorio</Button>
            </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={3}>
        <Card >
            <CardMedia
              component="img"
              height="180"
              image={AppImg}
              alt="green iguana"
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <Typography variant="subtitle2">
                    Visualizaçaos de paginas
                  </Typography>
                  <Typography variant="h6">{domain?.visits ?? 0}</Typography>
                </Grid>
                <Grid item xs={12} >
                  <Typography variant="subtitle2">RPM de página</Typography>
                  <Typography variant="h6">{domain?.rpm ?? 0}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={3}>
        <Card >
            <CardMedia
              component="img"
              height="180"
              image={MessagesImg}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Atendimento
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Conectese com o nosso suporte
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={()=>{navigate.to('/feedback')}}>Contatar</Button>
            </CardActions>
          </Card>
      </Grid>
    </Grid>
    </Container>
  );
};

export default Dashboard;
