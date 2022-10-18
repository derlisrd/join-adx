import axios from "axios"
import {env} from '../App/config';
import { /* encode, */ decode } from 'js-base64';


export const APICALLER = {
    get: async()=>{

    },
    insert:async()=>{

    },
    update: async()=>{

    },
    delete: async()=>{

    },

    login: async(form)=>{
        let url = env.API_END_POINT+'users/auth'
        let headers = {"Content-Type":"application/json"}
        try {
            let res = await axios({method:"post",headers,data:form,url})
            let data = {
                response: res.data.status,
                message: res.data.msg ?? null,
                results: res.data.user ?? null
            }
            return data;
        } catch (error) {
            let err = {
                response: false,
                message: error.message,
            }
            return err;
        }
    },

    validateToken: async(token)=>{
        let datas = decode(token);
        let url = env.API_END_POINT+'users/auth'
        let headers = {"Content-Type":"application/json"}
        try {
            let res = await axios({method:"post",headers,data:datas,url})
            let data = {
                response: res.data.status,
                message: res.data.msg ?? null,
                results: res.data.user ?? null
            }
            return data;
        } catch (error) {
            let err = {
                response: false,
                message: error.message,
            }
            return err;
        } 
    }
}