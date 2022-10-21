import { Box,  Container, Grid, Icon, IconButton, Stack, TextField, Typography } from '@mui/material'
import { APICALLER_FIREBASE } from '../../Services/apifirebase';
import { useState,useEffect,useCallback,useRef } from 'react'
import { useLogin } from '../../Context/LoginProvider';
import { functions } from '../../Utils/Functions';
import History from './Components/History'

const Chat = () => {

  const {userData} = useLogin()
  const {uid} = userData 
  const initialChat = {
    otherid:null,
    datetime: functions.dateDMY(),
    uid:uid,
    messages:[
      
    ]
  }

  const [chat,setChat] = useState(initialChat)
  const [inputText,setInputText] = useState("")
  const inputRef = useRef(null)
  const ref = useRef(null)

  const changeInputText = e=>{
      setInputText(e.target.value)
  }

  const insertMessage = async()=>{
    if(inputText===""){
      return false
    }
    setInputText("")
    let datas = {...chat}
    datas.messages.push({
      id:uid,
      message:inputText,
      date: new Date()
    })
    setChat(datas)
    ref.current?.scrollIntoView()
    await APICALLER_FIREBASE.update({documento:"chats",id:uid,params:datas})
    inputRef.current.focus()
  }
  const handleEnter = e=>{
    if(e.code==='Enter') insertMessage()
  }

  const getDatas = useCallback(async()=>{
    let initial = {
      otherid:null,
      datetime: functions.dateDMY(),
      uid:uid,
      messages:[
        
      ]
    }
    let res = await APICALLER_FIREBASE.get({documento:"chats",id:uid,params:initial})
    if(res.response){
      setChat(res.results)
    }
  },[uid])

  setTimeout(getDatas, 15000);

  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {
      getDatas();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getDatas]);

  return (
    <Container maxWidth="lg">

      <Box borderRadius={2} p={1} boxShadow={2} sx={{ height:`calc(100vh - 180px)`, overflow:"scroll" }} ref={ref} >
        <History datas={chat} uid={uid} />
      </Box>

      <Stack sx={{ position:"fixed", bottom: "30px", right:"20px", width:{xs:'300px',sm:'600px',md:'800px'} }}  direction="row" spacing={2}  p={1}>
          <TextField autoComplete="off" fullWidth
          inputRef={inputRef} size='large' onKeyPress={handleEnter} value={inputText} onChange={changeInputText} variant="standard" label="Escreba aqui..." autoFocus />
          <Stack direction="row">
            <IconButton><Icon>attach_file</Icon></IconButton>
            <IconButton onClick={insertMessage}><Icon>send</Icon></IconButton>
          </Stack>
      </Stack>
    </Container>
  )
}

export default Chat
