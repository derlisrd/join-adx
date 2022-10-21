import { Box, Icon, Stack, Typography } from "@mui/material";

const Me = ({message}) => {
  return (
    <Stack direction="row-reverse" spacing={1}  p={1}  >
      <Icon>account_circle</Icon>
      <Box>
        <Typography component="div" variant="subtitle2">
          {message}
        </Typography>
      </Box>
    </Stack>
  )
}

export default Me
