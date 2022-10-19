import { env } from "App/config";
import axios from "axios";

//const endpointTeste = 'http://192.168.3.13:8000/run/api/';
const endpoint = env.END_POINT_API;

const listDoamins = ['versaluddigital.com', 'viajeytrabajo.com', 'mezudo.com', 'noticiasonline2020.com', 'garden.noticiasonline2020.com', 'inmortalstudio.com', 'teayudoacomprar.com', 'mejoresrecetas.me', 'rasuradoraselectricas.com', 'trucosyapp.com', 'djjuanldm.com', 'tareasvirtual.com', 'panamapuntocom.com', 'finanzas.panamapuntocom.com', 'circuitointernacionaldepanama.com', 'convocatoriasgenerales.com', 'luckmusic.net', 'comosehace.pw', 'empleos.comosehace.pw', 'empleosideal.comosehace.pw', 'manualesaqui.online', 'blog.manualesaqui.online', 'planosdecasas.manualesaqui.online', 'costuras.info', 'consejosempresariales.com'];

const serveFunction = {

    createRegister: async function(params) {
        axios.defaults.headers.common['token'] = localStorage.getItem('auth-token-access');
        try {
            let storegeToken = localStorage.getItem('auth-token-access');
            const resp = await axios({
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "token": storegeToken,
                },
                data: params,
                url:`${endpoint}users/register`
            })
            return resp;
        }catch(e){
            return (e);
        }
    },
    
    listSupport: async () => {
        try {
            let storegeToken = localStorage.getItem('auth-token-access');
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "token": storegeToken,
                }
            }
            let res = await axios.get(`${endpoint}tickets/list`, config);
            res = res.data;
            return res;
        }catch(e){
            return (e);
        }
    },

    listReports: async (params) => {
        try {
            let storegeToken = localStorage.getItem('auth-token-access');
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "token": storegeToken,
                }
            }
            let dataReports = {
                inicial: params.dataInitial.split('-').reverse().join('-'),
                final: params.dataFinal.split('-').reverse().join('-')
            }
            let res = await axios.get(`${endpoint}revenue/${dataReports.inicial}/${dataReports.final}`, config);
            res = res.data;
            return res;
        }catch(e){
            return (e);
        }
    },

    listHistory: async (params) => {
        try {
            let storegeToken = localStorage.getItem('auth-token-access');
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "token": storegeToken,
                }
            }
            let res = await axios.get(`${endpoint}invoices`, config);
            res = res.data;
            return res;
        }catch(e){
            return (e);
        }
    },

    dataUser: async () => {
        try {
            let storegeToken = localStorage.getItem('auth-token-access');
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "token": storegeToken,
                }
            }
            let res = await axios.get(`${endpoint}users/data`, config);
            res = res.data;
            return res;
        }catch(e){
            return (e);
        }
    },

    listReplySupport: async (params) => { 
        try {
            let storegeToken = localStorage.getItem('auth-token-access');
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "token": storegeToken,
                }
            };
            let id_ticket = JSON.stringify(params);
            let res = await axios.get(`${endpoint}tickets/response/${id_ticket}`, config);
            res = res.data;
            return res;
        }catch(e){ 
            return  (e); 
        }
    },

    listDomains: async () => {
        try {
            let storegeToken = localStorage.getItem('auth-token-access');
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "token": storegeToken,
                }
            }
            let res = await axios.get(`${endpoint}domains/list`, config);
            res = res.data;
            return res;
        }catch(e){
            return (e);
        }
    },

    listDeductions: async () => {
        try {
            let storegeToken = localStorage.getItem('auth-token-access');
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "token": storegeToken,
                }
            }
            let res = await axios.get(`${endpoint}deductions`, config);
            res = res.data;
            return res;
        }catch(e){
            return (e);
        }
    },

    addTicket: async function(params) {
        axios.defaults.headers.common['token'] = localStorage.getItem('auth-token-access');
        try {
            let storegeToken = localStorage.getItem('auth-token-access');
            const resp = await axios({
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "token": storegeToken,
                },
                data: params,
                url:`${endpoint}tickets/add`
            })
            return resp;
        }catch(e){
            return (e);
        }
    },

    addReplyTicket: async function(params) {
        axios.defaults.headers.common['token'] = localStorage.getItem('auth-token-access');
        try {
            let storegeToken = localStorage.getItem('auth-token-access');
            const resp = await axios({
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "token": storegeToken,
                },
                data: params,
                url:`${endpoint}tickets/response`
            })
            return resp;
        }catch(e){
            return (e);
        }
    },

    putUser: async function(params) {
        axios.defaults.headers.common['token'] = localStorage.getItem('auth-token-access');
        try {
            let storegeToken = localStorage.getItem('auth-token-access');
            const resp = await axios({
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "token": storegeToken,
                },
                data: params,
                url:`${endpoint}users/update`
            })
            return resp;
        }catch(e){
            return (e);
        }
    },

    revShare: async function(params){

        console.debug('AQUI: ',params);
        var dateCustom = new Date();
        var dia = String(dateCustom.getDate()).padStart(2, '0');
        var mes = String(dateCustom.getMonth() + 1).padStart(2, '0');
        var ano = dateCustom.getFullYear();
        dateCustom = ano + '-' + mes + '-' + dia;
    
        let dataInitial = params.dataInitial;
        let dataFinal = params.dataFinal;
    
        axios.defaults.headers.common['token'] = localStorage.getItem('auth-token-access');
        try {
            let storegeToken = localStorage.getItem('auth-token-access');
            const resp = await axios({
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "token": storegeToken,
                },
                data:{
                    from: dataInitial, 
                    to: dataFinal,
                    domains: listDoamins
                },
                url:`${endpoint}revshare/daniel`
            })
            return resp;
        }catch(e){
            return (e);
        }
    },

    urlBiulder: async function(params){

        axios.defaults.headers.common['token'] = localStorage.getItem('auth-token-access');
        try {
            let storegeToken = localStorage.getItem('auth-token-access');
            const resp = await axios({
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "token": storegeToken,
                },
                data:{
                    from: params.dataInitial.split('-').reverse().join('-'), 
                    to: params.dataFinal.split('-').reverse().join('-'),
                    sites: params.domains
                },
                url:`${endpoint}report/key-value`
            })
            return resp;
        }catch(e){
            return (e);
        }
    }
};

export default serveFunction;