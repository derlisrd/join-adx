import { Icon, Stack, Typography } from "@mui/material";


export default function({icon,title}){
    return(
        <Stack direction="row" alignItems="center" spacing={2} ><Icon color="primary">{icon}</Icon> <Typography variant='button'>{title}</Typography></Stack> 
    )
}