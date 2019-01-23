import axios from '../../axios'
export default {
    namespaced:true,
    state:{
        captchas:''
    },
    actions:{
        testLogin({commit},user){
            // return new Promise((resolve,reject)=>{
            //     axios.post('http://ele.kassing.cn/v2/login',{
            //         user
            //     }).then(res=>{
            //         resolve()
            //         console.log(res.data)
            //     })
            // })
            axios.post('/v2/login',user).then(res=>{
                console.log(res.data)
            })
        },
        changeCode({commit}){
            axios.post('/v1/captchas').then(res=>{
                // console.log(res.data)
                commit('setCode',res.data.code)
            })
        },
        update({commit},user){
            axios.post('/v2/changepassword',user).then(res=>{
                console.log(res.data)
            })
        }
    },
    mutations:{
        setCode(state,code){
            state.captchas=code
        }
    }
}