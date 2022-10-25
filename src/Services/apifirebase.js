import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth,signInWithEmailAndPassword,signOut} from 'firebase/auth'
import {collection,getDocs, doc,getDoc,getFirestore,serverTimestamp,setDoc, updateDoc,query,where} from 'firebase/firestore'
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

export const app = initializeApp(firebaseConfig);
const auth = getAuth()
export const db = getFirestore()


export const APICALLER_FIREBASE = {

   
    get_where: async({name_collection, field,operator,val})=>{
        try {

            
            const q = query(collection(db, name_collection),where(field,operator,val));

            const querySnapshot = await getDocs(q);
            const result = []
            querySnapshot.forEach((doc) => {
                //doc.data() //is never undefined for query doc snapshots
                result.push(doc.data())
                //console.log(doc.id, " => ", doc.data());
            }); 
            return {
                response:true,
                results: result
            }
            
        } catch (error) {
            return {
                response:false,
                error: error
            } 
        }
    },
    get : async({documento,id,params={}})=>{
        try {
            let res = await getDoc(doc(db,documento,id))
            if(!res.exists()){
             let u = await  setDoc(doc(db,documento,id),params)
             return u.data()
            }
            return {
                response:true,
                results: res.data()
            }
        } catch (error) {
            return {
                response:false,
                error: error
            } 
        }
    },
    update: async({documento,id,params})=>{
        try {
            let res = await updateDoc(doc(db,documento,id),params)  
            return res.data
        } catch (error) {
            return {
                response:false,
                error: error
            } 
        }
    },
    register : async({email,password})=>{
       let res = await createUserWithEmailAndPassword(auth, email, password)
       try {
            let datetime = new Date()
             await setDoc( doc(db,'users',res.user.uid),{
                email:email,
                online:true,
                rol:0,
                user_id:res.user.uid,
                date:datetime,
                datetime: serverTimestamp()
            })

            return {
                message:"",
                response:true,
                results: res.user
            } 

        } catch (error) {
            console.log(error)
        }
    },
    login: async({email,password})=>{
        try {
            let res = await signInWithEmailAndPassword(auth, email, password)
                return {
                    message:"",
                    response:true,
                    results: res.user
                }
            } catch (error) {
                return {
                    error: error.code,
                    message:error.message,
                    response:false
                }
            }
    },
    logout: async()=>{

        signOut(auth).then(() => {
            console.log("out");
          }).catch((error) => {
            // An error happened.
          });
    }
}

