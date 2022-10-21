import { Icon, Stack, Typography } from "@mui/material";

const Other = ({message}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="start" bgcolor='primary.light' p={1} borderRadius={2} >
      <Icon>support_agent</Icon>
      <Stack>
        <Typography component="div" variant="body2">
          Suporte:
        </Typography>
        <Typography component="div" variant="caption">
          {message}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Other
