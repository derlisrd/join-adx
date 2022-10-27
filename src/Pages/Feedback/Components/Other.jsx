import { Box,  Stack, Typography } from "@mui/material";

const Other = ({message,date}) => {
  return (
    <Stack direction="row" spacing={1}  p={1}  >
      <Box>

        <Typography component="div" sx={{ bgcolor:"secondary.light",p:1,borderRadius:2,textAlign:'left' }} variant="subtitle2">
          {message}
        </Typography>
        <Typography component="span" variant="caption" sx={{ textAlign:'left' }}>
          {date}
        </Typography>

      </Box>
    </Stack>
  )
}

export default Other
