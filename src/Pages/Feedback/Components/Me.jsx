import { Box,  Stack, Typography } from "@mui/material";

const Me = ({message,date}) => {
  return (
    <Stack direction="row-reverse" spacing={1}  p={1}  >
      <Box>

        <Typography component="div" sx={{ bgcolor:"primary.light",p:1,borderRadius:2, textAlign:'left' }} variant="subtitle2">
          {message}
        </Typography>
        <Typography component="div" variant="caption" sx={{ textAlign:'left' }}>
          {date}
        </Typography>

      </Box>
    </Stack>
  )
}

export default Me
