<template>
    <div class="my">
        <myheader >
            <p slot="myheader">账户信息</p>
        </myheader>
        <section class="headportrait">
            <div>
                <input type="file" class="profileinfopanel-upload">
                <h2>头像</h2>
            </div>
            
            <div >
                <img width="50" height="50"  src="//elm.cangdu.org/img/default.jpg" alt="" class="headportrait-div-top">
                <span class="headportrait-div-bottom">></span>
            </div>
        </section>
        <section class="headportrait headportraitwo">
            <h2>用户名</h2>
            <div class="num-box">
                <p class="data-num">{{userMsg.username}}</p>
                <span class="headportrait-div-bottom data-num-z">></span>
            </div>
        </section>
        <section class="headportrait headportraitwo">
            <h2>收货地址</h2>
            <div class="num-box">
                <span class="headportrait-div-bottom data-num-z">></span>
            </div>
        </section>
        <section class="bind-phone"> <span>账号绑定</span> </section>
        <section class="headportrait headportraitwo headportraithree">
            <h2><img width="24" height="24" src="../../../imgs/phone1.png" alt="">手机</h2>
            <div class="num-box">
                <span class="headportrait-div-bottom data-num-z">></span>
            </div>
        </section>
        <section class="bind-phone"> <span>安全设置</span> </section>
        <router-link to="/reset" class="headportrait headportraitwo">
            <h2>登录密码</h2>
            <div class="num-box">
                <p class="data-num">修改</p>
                <span class="headportrait-div-bottom data-num-z">></span>
            </div>
        </router-link>

        <van-button type="danger" size="large">退出登录</van-button>
    </div>
   
</template>

<script>
import myheader from "../../components/myheader";
export default {
    components: {
    myheader
  },
  computed:{
      userMsg(){
          return this.$store.state.login.userMessage
      }
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.my {
  padding-top: 44px;
  width:100%;
  height: 100%;
  background: #f5f5f5;
}

.headportrait{
    height: 1.45rem;
    margin-top: .2rem;
    padding: .5rem .4rem;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    border-top: 1px solid #ddd;
    background: #fff;
}
.profileinfopanel-upload{
    display: block;
    position: absolute;
    opacity: 0;
    top: 1rem;
    left: 0;
    width: 100%;
    height: 1.45rem;
}
.headportrait h2{
    font-size: .28rem;
    color: #333;
    font-weight: 500;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    
}
.headportrait-div-top{
    line-height: 1.45rem;
    border-radius: 50%;
    vertical-align: middle;
}
.headportrait-div-bottom{
    display: inline-block;
    font-size: 0.4rem;
    color: #BCBCBC;
    margin-left: 0.2rem;  
    line-height: 1.45rem;                             
}
.num-box{
    display: flex;
    -ms-flex-pack: left;
    justify-content: left;
}
.data-num{
    text-align: left;
    font-size: .34rem;
    color: #999;
    margin-right: .2rem;
    font-weight: 100;
    font-family: Arial;
    line-height: 0.94rem;
}
.data-num-z{
    line-height: 0.94rem;
}
.headportraitwo {
    height: 0.94rem;
    margin-top: 0;
    padding: .3rem .4rem;
}
.bind-phone{
    height: 0.7rem;
    padding: 0.2rem .4rem;
    font-size: .26rem;
    color: #666;
}
.headportraithree{

}
</style>
