import axios from '../../axios'
import router from '../../router/index'
export default {
    namespaced:true,
    state:{
        captchas:'',
        userMessage:{}
    },
    actions:{
        testLogin({commit},user){
            return new Promise((resole,reject)=>{
                axios.post('/v2/login',user).then(res=>{
                    // console.log(res.data)
                    localStorage.setItem('status',res.data.username)
                    this.userMessage=res.data
                    // console.log(this)
                    resole()
                })
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