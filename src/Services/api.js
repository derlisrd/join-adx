

export const APICALLER = {
    get: async()=>{

    },
    insert:async()=>{

    },
    update: async()=>{

    },
    delete: async()=>{

    },
    login: async()=>{

        return {
            response:true,
            found:1,
            results:[
                {
                    login:true,
                    token_user:"12345token",
                    id_user:1,
                    nombre_user:"derlis",
                    username_user:"derlis",
                    remember:false
                }
            ]
        }
    },
    validateToken: async()=>{
        return {
            response:true,
            found:1,
            results:[
                {
                    login:true,
                    token_user:"12345token",
                    id_user:1,
                    nombre_user:"derlis",
                    username_user:"derlis",
                    remember:false
                }
            ]
        }
    }
    
}