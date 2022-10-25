import { Stack } from "@mui/material";
import React, { Fragment } from "react";
import Me from "./Me";
import Other from "./Other";

const History = ({ datas,uid }) => {

 
  
  return (
    <Stack spacing={1} >
      {datas.messages.map((e,i)=>(
        <Fragment key={i}>
          {e.id === uid ? <Me message={e.message}  date={e.date}/> :
          <Other message={e.message} date={e.date} /> }
        </Fragment>
      ))}
    </Stack>
  );
};

export default History;
