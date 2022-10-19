import { Box, Container, Grid, LinearProgress, Typography } from "@mui/material";

import React from "react";
import { useSites } from "./SitesProvider";

const ListaSites = () => {
  const { lista, loading } = useSites();

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
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6">Sites</Typography>
        </Grid>
        <Grid item xs={12}>
            {
                lista.map((e,i)=>(
                    <Box key={i} bgcolor='background.paper' borderRadius={1} boxShadow={2} margin={2} padding={3}>
                        <Typography variant="body1">{e.name}</Typography>
                    </Box>
                ))
            }
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListaSites;
