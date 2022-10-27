import { Box, TextField } from '@mui/material'
import { APICALLER_FIREBASE } from '../../Services/apifirebase';
import { useState,useEffect,useCallback,useRef } from 'react'
import { useLogin } from '../../Context/LoginProvider';
import { functions } from '../../Utils/Functions';
import History from './Components/History'
import style from './Styles/chat.module.css'
const Chat = () => {

  const {userData} = useLogin()
  const [count,setCount] = useState(0)
  
  const [timer,setTimer] = useState(functions.setTime(180))
  const {uid} = userData 
  const initialChat = {
    otherid:null,
    datetime: functions.dateDMY(),
    uid:uid,
    messages:[]
  }

  const [chat,setChat] = useState(initialChat)
  const [inputText,setInputText] = useState("")
  const inputRef = useRef(null)
  const ref = useRef(null)

  const changeInputText = e=>{
      setInputText(e.target.value)
  }

  const insertMessage = async()=>{
    if(inputText==="") return false
    setInputText("")
    let datas = {...chat}
    datas.messages.push({
      id:uid,
      message:inputText,
      date: functions.datetimeDMYHMS()
    })
    setCount(count+1)
    setTimer(functions.setTime(180))
    setChat(datas)
    
    await APICALLER_FIREBASE.update({documento:"chats",id:uid,params:datas})
    inputRef.current.focus()
    var sc = document.getElementById("your_div")
    sc.scrollTo(0,(sc.scrollHeight + 40) )
  }




  const handleEnter = e=>{
    if(e.code==='Enter') insertMessage()
  }
  

  
  const getDatas = useCallback(async()=>{
    let initial = {
      otherid:null,
      datetime: functions.dateDMY(),
      uid:uid,
      messages:[]
    }
    
    let res  = await APICALLER_FIREBASE.get({documento:"chats",id:uid,params:initial})
    if(res?.response){
      //console.log(count,res.results.messages.length)
      if(count!==res.results.messages.length){
        var sc = document.getElementById("your_div")
        sc?.scrollTo(0,sc.scrollHeight )
        setTimer(functions.setTime(180))
      }
      setCount(res.results.messages.length)
      setChat(res.results)
    }
    
  },[uid,count])

  
  


  setTimeout(()=>{
    if(timer > functions.getTime()){
      getDatas()
      console.log("AINDA ONLINE")
    }else{
      console.log("TA OFFLINE")
    }
  }, 30000);

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


return(
  <div className={style.app_chat} >
    <div className={style.app_chat_section}>
      
      <Box borderRadius={2} p={1} boxShadow={2} width='100%' sx={{ height:`75vh`, overflowY:'scroll' }} id="your_div" ref={ref} >
        <History datas={chat} uid={uid} />
      </Box>
      
      <Box className={style.app_chat_send}>
        <TextField autoComplete="off" fullWidth inputRef={inputRef}  onKeyPress={handleEnter} value={inputText} onChange={changeInputText} label="Escreba aqui..." autoFocus />
      </Box>
    </div>
  </div>
)

/*   return (
    <Container maxWidth="lg">

      <Box borderRadius={2} p={1} boxShadow={2} sx={{ height:`calc(100vh - 180px)`, overflowY:'scroll' }} id="your_div" ref={ref} >
        <History datas={chat} uid={uid} />
      </Box>

      <Stack sx={{ position:"fixed", bottom: "30px", right:"20px", width:{xs:'300px',sm:'600px',md:'800px'} }} >
          <TextField autoComplete="off" fullWidth
          inputRef={inputRef} size='large' onKeyPress={handleEnter} value={inputText} onChange={changeInputText} variant="standard" label="Escreba aqui..." autoFocus />
          <Stack direction="row">
            <IconButton><Icon>attach_file</Icon></IconButton>
            <IconButton onClick={insertMessage}><Icon>send</Icon></IconButton>
          </Stack>
      </Stack>
    </Container> 
  )*/

}

export default Chat
