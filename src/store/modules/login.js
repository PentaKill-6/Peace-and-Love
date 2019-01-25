import axios from '../../axios'
import router from '../../router/index'
import Vue from 'vue'
import { Dialog } from 'vant';

Vue.use(Dialog);
export default {
    namespaced:true,
    state:{
        captchas:'',
        userMessage:{}
    },
    actions:{
        testLogin({commit},user){
            return new Promise((resolve,reject)=>{
                axios.post('/v2/login',user).then(res=>{
                    // console.log(res.data)
                    localStorage.setItem('status',res.data.username)
                    commit('setUserMsg',res.data)
                    // console.log(this)
                    if(res.data.message){
                        Dialog.alert({
                            message: res.data.message
                          }).then(() => {
                            // on close
                          });
                    }else{
                        resolve()
                    }
                    
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
        },
        setUserMsg(state,userMessage){
            state.userMessage=userMessage
        }
    }
}