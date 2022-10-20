import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import { env } from "../App/config";

const firebaseConfig = {
    apiKey: env.FIREBASE_APIKEY,
    authDomain: env.FIREBASE_AUTH_DOMAIN,
    projectId: env.FIREBASE_PROJECT_ID,
    storageBucket: env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID ,
    appId: env.FIREBASE_APP_ID,
    measurementId: env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()



export const APICALLER_FIREBASE = {

    register : async({email,name,password})=>{
        let res = await createUserWithEmailAndPassword(name,email,password)
        try {
            return res;
        } catch (error) {
            console.log(res)
        }
    }
}

