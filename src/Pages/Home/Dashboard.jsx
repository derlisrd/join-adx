import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";
import { useHome } from "./HomeProvider";

const Dashboard = () => {
  const { loading } = useHome();

  if (loading) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={8}>
        <Box
          bgcolor='primary.light'
          boxShadow={2}
          padding={3}
          borderRadius={2}
        >
          <Grid container spacing={1}>
            <Grid xs={12} item>
              <Typography variant="h6">Ganhos estimados</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} item>
              <Typography variant="body1">Hoje, até o momento</Typography>
              <Typography variant="h6">18,9 US$</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} item>
              <Typography variant="body1">Ontem</Typography>
              <Typography variant="h6">39,9 US$</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} item>
              <Typography variant="body1">Últimos 7 días</Typography>
              <Typography variant="h6">539,9 US$</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={3} item>
              <Typography variant="body1">Este mes</Typography>
              <Typography variant="h6">1539,9 US$</Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Box
          backgroundColor="primary.light"
          borderColor="background.paper"
          boxShadow={3}
          padding={3}
          borderRadius={2}
        >
          <Typography variant="h6">Saldo</Typography>
          <Typography variant="h6">1539,9 US$</Typography>
          <Typography variant="body2">Último pagamento:</Typography>
          <Typography variant="subtitle2">130 Us$</Typography>
        </Box>
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <Box
          border={1}
          borderColor="background.paper"
          boxShadow={3}
          backgroundColor="background.paper"
          padding={2}
          borderRadius={2}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Hoje, até o momento</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">
                Visualizaçaos de paginas
              </Typography>
              <Typography variant="h6">17,0 mil</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">RPM de página</Typography>
              <Typography variant="h6">Us$ 1,12</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Impressoes</Typography>
              <Typography variant="h6">4,89 mil</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">CPC</Typography>
              <Typography variant="h6">Us$ 0,12</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Cliques</Typography>
              <Typography variant="h6">134</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">CTR de página</Typography>
              <Typography variant="h6">0,90%</Typography>
            </Grid>
          </Grid>
          <Button>Ver relatorio</Button>
        </Box>
      </Grid>

      <Grid item xs={12} sm={12} md={6}></Grid>
    </Grid>
  );
};

export default Dashboard;
