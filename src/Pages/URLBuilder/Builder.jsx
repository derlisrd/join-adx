import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"

const Builder = () => {
  return (
    <Container>
        <Box p={2} boxShadow={2} borderRadius={3} bgcolor='background.paper'>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">Criador URL Rastreável</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField fullWidth size="large" label="Blog/Post URL:" helperText="O endereço completo URL (ex. https://www.meublog.com)" />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField fullWidth size="large" label="Origem da campanha:" helperText="A referencia: (ex. google, facebook)" />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField fullWidth size="large" label="Formato da campanha:" helperText="A referencia: (ex. push, manychat, email)" />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField fullWidth size="large" label="Nome da campanha:" helperText="A referencia: (ex. post_diaX, campanha_monetiza)" />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" size="large">Gerar</Button>
            </Grid>
        </Grid>
        </Box>
    </Container>
  )
}

export default Builder
