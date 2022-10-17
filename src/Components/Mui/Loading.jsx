import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <div>
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Loading
