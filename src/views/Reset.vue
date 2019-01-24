<template>
    <div class="login">
    <div class="login-header">
      <div class="login-h">
        <van-icon name="arrow-left" @click="goback"/>
        <p class="title">重置密码</p>
      </div>
    </div>
    <div class="login-body">
      <van-cell-group>
        <van-field v-model="user.username" placeholder="账号"/>
      </van-cell-group>
      <van-cell-group class="login-password">
        <van-field v-model="user.oldpassWord" placeholder="旧密码"  type="password"/>
      </van-cell-group>
      <van-cell-group class="login-password">
        <van-field v-model="user.newpassword" placeholder="请输入新密码"  type="password"/>
      </van-cell-group>
      <van-cell-group class="login-password">
        <van-field v-model="user.confirmpassword" placeholder="请确认密码"  type="password"/>
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
      <van-button class="btn" type="primary" size="large" @click="update">确认修改</van-button>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            user:{
                username:'',
                oldpassWord:'',
                newpassword:'',
                confirmpassword:'',
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
        changeCode(){
            this.$store.dispatch('login/changeCode').then(()=>{

            })
        },
        update(){
            this.$store.dispatch('login/update',this.user).then(()=>{
                console.log(this.user)
            })
        },
        goback(){
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.login-header {
  height: 0.9rem;
  background: #3190e8;
  font-size: 0.4rem;
  color: white;
  /* padding: 0.2rem; */
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
}
</style>
