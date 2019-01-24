import axios from '../../axios'
export default {
    namespaced:true,
    state:{
        captchas:'',
        userMessage:{}
    },
    actions:{
        testLogin({commit},user){
            axios.post('/v2/login',user).then(res=>{
                console.log(res.data)
                localStorage.setItem('status',res.data.username)
                this.userMessage=res.data
                // const url=this.$route.query.returnURL
                // console.log(url)
                // this.$router.push(url)
                this.$router.push('/profile')
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