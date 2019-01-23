<template>
  <div class="login">
    <div class="login-header">
      <div class="login-h">
        <van-icon name="arrow-left" @click="goback"/>
        <p class="title">密码登录</p>
      </div>
    </div>
    <div class="login-body">
      <van-cell-group>
        <van-field v-model="user.username" placeholder="用户名"/>
      </van-cell-group>
      <van-cell-group class="login-password">
        <van-field v-model="user.password" placeholder="密码" v-if="checked"  type="text"/>
        <van-field v-model="user.password" placeholder="密码" v-else  type="password"/>
        <van-switch class="password-btn" v-model="checked" size="24px" active-color="#07c160" @change="changeChecked"/>
      </van-cell-group>
      <van-cell-group >
        <van-field v-model="user.captcha_code" placeholder="验证码"/>
      </van-cell-group>
      <div class="login-code">
        <img :src="captchas" alt="">
        <div class="login-change"> 
            <p>看不清</p>
            <p class="change" @click="changeCode">换一张</p>
        </div>
      </div>
      <div class="login-tip">
          <p>温馨提示 : 未注册过的账号 , 登录时将自动注册</p>
          <p>注册过的用户可凭账号密码登录</p>
      </div>
      <van-button class="btn" type="primary" size="large" @click="login">登录</van-button>
      <router-link to="/reset" class="reset" >重置密码?</router-link>
    </div>
  </div>
</template>

<script>
import axios from '../axios'
import store from '../store/index'
export default {
    data(){
        return{
            checked:false,
            user:{
                username:'',
                password:'',
                captcha_code:''
            }
        }
    },
    created(){
        this.changeCode()
    },
    computed:{
        captchas(){
            return this.$store.state.login.captchas
        }
    },
    methods:{
        changeChecked(checked){
            this.checked=checked;
            // console.log(checked)
        },
        login(){
            this.$store.dispatch('login/testLogin',this.user).then(()=>{
                // console.log(this.user)
            })
        },
        changeCode(){
            this.$store.dispatch('login/changeCode').then(()=>{

            })
        },
        goback(){
            this.$router.push('/home')
        }
    }
};
</script>

<style scoped>
.login-header {
  height: 0.9rem;
  background: #3190e8;
  font-size: 0.4rem;
  color: white;
}
.login-header .login-h {
  width: 60%;
  height: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-header .login-h .title {
  font-weight: bold;
}
.login-body{
    margin-top: 0.3rem;
}
.login-password{
    display: flex;
}
.password-btn{
    margin-top: 0.2rem;
}
.login-code{
    display: flex;
    justify-content: space-around;
    margin-top: 0.3rem;
}
.login-change p{
    font-size: 0.25rem;
}
.change{
    color:#3190e8;
}
.login-tip{
    display: flex;
    flex-direction: column;
    padding: 0.2rem;
}
.login-tip p{
    font-size: 0.12rem;
    color:red;
}
p{
    margin: 0.15rem;
}
.btn{
    border-radius: 0.1rem;
}
.reset{
    color:#3190e8;
    font-size: 0.3rem;
    float: right;
    margin-top: 0.4rem;
}
</style>
