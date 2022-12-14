import { IconButton, Box, Icon, Grid, Stack,Tooltip, Typography } from "@mui/material";
import { useTema } from "../../Context/TemaProvider";


const Tema = () => {
  const { changeColor, AvaibleColors, tema,changeFont } = useTema();

  const fontSizeGeneral = parseInt(tema.fontSize.general);
  const fontSizeMenu = parseInt(tema.fontSize.menu);
  return (
    <Box>
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{lang.tema_y_colores}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">{lang.seleccionar_color}</Typography>
      </Grid>
        <Grid item xs={12}>
          {AvaibleColors.map((e, i) => (
            <IconButton key={i} onClick={() => {changeColor(e.name);}}>
              <Icon sx={{ color: e.color }}>palette</Icon>
            </IconButton>))}
        </Grid>

        <Grid item xs={12}>
          <span>
            <Stack direction="row">
              <Tooltip title="Restar 1">
                  <IconButton onClick={() => {changeFont("general",fontSizeGeneral-1)}}>
                    <Icon>remove_circle_outline</Icon>
                  </IconButton>
                  </Tooltip>
                  <h6 style={{ fontSize:fontSizeGeneral }}> {lang.tamano_fuente_general} {fontSizeGeneral}</h6>
                  <Tooltip title="Sumar 1">
                  <IconButton onClick={() => {changeFont("general",fontSizeGeneral+1)}}>
                    <Icon>add_circle_outline</Icon>
                    
                  </IconButton>
                  </Tooltip>
                </Stack>
          </span>
        </Grid>

        <Grid item xs={12}>
          <span>
            <Stack direction="row">
              <Tooltip title="Restar 1">
                  <IconButton onClick={() => {changeFont("menu",fontSizeMenu-1)}}>
                    <Icon>remove_circle_outline</Icon>
                  </IconButton>
                  </Tooltip>
                  <h6 style={{ fontSize:fontSizeMenu }}>{lang.tamano_fuente_menu} {fontSizeMenu}</h6>
                  <Tooltip title="Sumar 1">
                  <IconButton onClick={() => {changeFont("menu",fontSizeMenu+1)}}>
                    <Icon>add_circle_outline</Icon>
                  </IconButton>
                  </Tooltip>
                </Stack>
          </span>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tema;
