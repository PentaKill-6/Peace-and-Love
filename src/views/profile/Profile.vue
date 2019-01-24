<template>
    <div class="my">
        <myheader >
            <p slot="myheader">我的</p>
        </myheader>
        <router-link to="/Info" class="login">
            <div>
                <img width="59" height="59" :src="userMsg.avatar">
            </div>
            <div class="login-info">
                <div>
                    <p></p>
                    <p>{{userMsg.username}}</p>
                    <p>
                        <img class="phone" src="../../../imgs/phone.png" alt="">
                        <span>暂无绑定手机号</span>
                    </p>
                </div>
                <p class="info-icon">></p>
            </div>
        </router-link>
        <ul class="clear">
            <li>
                <span class="clear-top">0元</span>
                <span class="clear-bottom">我的余额</span>
            </li>
            <li>
                <span class="clear-top colorOne">3个</span>
                <span class="clear-bottom">我的优惠</span>
            </li>
            <li>
                <span class="clear-top colorTwo">0分</span>
                <span class="clear-bottom">我的积分</span>
            </li>
        </ul>

        <router-link to="/order" class="link">
            <div class="dev">
                <img class="icon" width="24" height="24" src="../../../imgs/order.png" alt="">
                <span>我的订单</span>
                
            </div>
            <span class="dian">></span>
        </router-link>
        <router-link to="/shop" class="link">
            <div class="dev">
                <img class="icon" width="24" height="24" src="../../../imgs/shop.png" alt="">
                <span>积分商城</span>
                
            </div>
            <span class="dian">></span>
        </router-link>
        <router-link to="/star" class="link">
            <div class="dev">
                <img class="icon" width="24" height="24" src="../../../imgs/star.png" alt="">
                <span>饿了吗会员卡</span>
                
            </div>
            <span class="dian">></span>
        </router-link>
        
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
  created(){
      console.log(this.userMsg)
  }
 
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
.login {
  display: flex;
  padding: 10px;
  background: #3190e8;
}

.login .loginto {
  display: flex;
  align-items: center;
}
.login img{
    display: inline-block;
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    vertical-align: middle;
}
.login-info{
    margin-left: 0.2rem;
   width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.login-info p:nth-child(2){
    font-weight: 700;
    font-size: .3rem;
    color:#fff;
    margin-left: 0.1rem;
    margin-top: 0.3rem;
}
.login-info p:nth-child(3) {
    font-size: 0.24rem;
    color:#fff;
    margin-top: 0.1rem;
}
.clear{
    width: 100%;
    background: #fff;
    box-sizing: border-box;
}
.clear li{
    display: flex;
    width: 33.33%;
    display: inline-block;
    border-right: 1px solid #f1f1f1;
    
}
.clear span{
    display: block;
    width: 100%;
    text-align: center;
}
.clear .clear-top{
   display: inline-block;
    font-size: 0.6rem;
    color: #f90;
    font-weight: 700;
    line-height: 1rem;
    font-family: Helvetica Neue,Tahoma;
}
.clear .colorOne{
    color: #ff5f3e;
}
.clear .colorTwo{
    color: #6ac20b;
}
.clear .clear-bottom{
    font-size: .27333rem;
    color: #666;
    font-weight: 400;
    padding-bottom: .453333rem;
}
.icon{
    margin-left: 0.3rem;
     vertical-align: middle;
     margin-right: 0.2rem;
}
.dev{
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.32rem;
    padding: 0 0.2rem;
   
}
.link{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333333;
}
.dian{
    font-size: 0.36rem;
    margin-right: 0.2rem;
    color: #BCBCBC;
}
.login .phone{
    width: 0.36rem;
    height: 0.36rem;
}
</style>