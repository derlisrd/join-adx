import { Box, Icon, Stack, Typography } from "@mui/material";

const Me = ({message,date}) => {
  return (
    <Stack direction="row-reverse" spacing={1}  p={1}  >
      <Icon>account_circle</Icon>
      <Box>
      <Typography component="div" variant="body2">
          Eu: <Typography component="span" variant="caption">
          
        </Typography>
        </Typography>
        <Typography component="div" variant="caption">
          {message}
        </Typography>
      </Box>
    </Stack>
  )
}

export default Me
