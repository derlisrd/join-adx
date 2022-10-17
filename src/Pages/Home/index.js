import { Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import React from 'react';

const Home = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Box
              sx={{ backgroundColor: "primary.light" }}
              padding={3}
              borderRadius={2}
            >
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <Typography variant="h6">Ganhos estimados</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={3} item>
                  <Typography variant="subtitle1">
                    Hoje, até o momento
                  </Typography>
                  <Typography variant="h5">18,9 US$</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={3} item>
                  <Typography variant="subtitle1">Ontem</Typography>
                  <Typography variant="h5">39,9 US$</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={3} item>
                  <Typography variant="subtitle1">Últimos 7 días</Typography>
                  <Typography variant="h5">539,9 US$</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={3} item>
                  <Typography variant="subtitle1">Este mes</Typography>
                  <Typography variant="h5">1539,9 US$</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box
              sx={{ backgroundColor: "primary.light" }}
              padding={3}
              borderRadius={2}
            >
              <Typography variant="h6">Saldo</Typography>
              <Typography variant="h5">1539,9 US$</Typography>
              <Typography variant="body1">Último pagamento:</Typography>
              <Typography variant="body1">130 Us$</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Box
              border={1}
              borderColor="primary.light"
              padding={2}
              borderRadius={2}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='subtitle1'>Hoje, até o momento</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='subtitle2'>Visualizaçaos de paginas</Typography>
                    <Typography variant='h6'>17,0 mil</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='subtitle2'>RPM de página</Typography>
                    <Typography variant='h6'>Us$ 1,12</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='subtitle2'>Impressoes</Typography>
                    <Typography variant='h6'>4,89 mil</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='subtitle2'>CPC</Typography>
                    <Typography variant='h6'>Us$ 0,12</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='subtitle2'>Cliques</Typography>
                    <Typography variant='h6'>134</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='subtitle2'>CTR de página</Typography>
                    <Typography variant='h6'>0,90%</Typography>
                </Grid>
              </Grid>
              <Button>Ver relatorio</Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={12} md={6}></Grid>
        </Grid>
      </>
    );
};

export default Home;