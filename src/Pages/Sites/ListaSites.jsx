import { Box, Link, Container, Grid, LinearProgress, Stack, Typography } from "@mui/material";

import React from "react";
import { env } from "../../App/config";
import { useSites } from "./SitesProvider";

const ListaSites = () => {
  const { lista, loading } = useSites();
  const url = env.API_END_POINT
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
                        <Stack direction="row" spacing={2}>
                          <Typography variant="body1">{e.domain}</Typography>
                          <Link underline="none" href={`${url}download/${e.id}`}>Baixar txt</Link>
                        </Stack>
                    </Box>
                ))
            }
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListaSites;
