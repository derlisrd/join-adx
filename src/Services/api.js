import axios from "axios"
import {env} from '../App/config';
//import { /* encode, */ decode } from 'js-base64';
import CryptoJS from "crypto-js";

const Descifrar = t => CryptoJS.AES.decrypt(t, env.SECRETO).toString(CryptoJS.enc.Utf8);

export const APICALLER = {
    
    get: async({token,url})=>{
        let endpoint = env.API_END_POINT+url
        let headers = {"Content-Type":"application/json","token":Descifrar(token)}

        try {
            let res = await axios({method:"get",headers,url:endpoint})
            let data = {
                response: true,
                message: res.data.msg ?? null,
                results: res.data ?? []
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
    update: async({token,url,body})=>{
        let endpoint = env.API_END_POINT+url
        let headers = {"Content-Type":"application/json","token":Descifrar(token)}

        try {
            let res = await axios({method:"put",headers,url:endpoint,data:JSON.stringify(body)})
            let data = {
                response: true,
                message: res.data.msg ?? null,
                results: res.data ?? []
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
        
        let url = env.API_END_POINT+'users/data'
        let headers = {"Content-Type":"application/json","token":token}
        try {
            let res = await axios({method:"get",headers,url})

            let data = {
                response: res.data.status,
                message: res.data.msg ?? null,
                results: res.data.data ?? null
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