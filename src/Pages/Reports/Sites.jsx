import { Container } from '@mui/material'
import React, { useCallback } from 'react'
import { useQuery } from 'react-query'
import { useLogin } from '../../Context/LoginProvider'
import { APICALLER } from '../../Services/api'
import Acordeon from './components/Acordeon'

const Sites = () => {

  const {userData} = useLogin()
  const {token_user} = userData
  const getSites = useCallback(async()=>{
    let res = await APICALLER.get({url:'domains/list',token:token_user});
    return res.results
  },[token_user])


  const {isLoading,data:sites} = useQuery(['getsites'], getSites);



  return (
    <Container maxWidth="lg">
      <Acordeon isLoading={isLoading} sites={sites} />
    </Container>
  )
}

export default Sites
