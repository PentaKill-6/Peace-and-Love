<template>
  <div class="orderbox">
    <van-nav-bar title="确认订单" left-text="返回" left-arrow  @click-left="onClickLeft"/>
    <div class="ordercont">
      <div class="ordercont_address">
        <p>订单配送至</p>
        <h3>
            <p @click="addre">{{(address==0)?"选择收货地址":address.address}}</p>
            <span>
                <van-icon name="arrow"/>
            </span>
        </h3>
        <p class="ordercont_tel" v-if="!(address==0)">
          <span>{{address.name}}({{(address.sex==1)?"先生":"女士"}})</span>
          <span>{{address.tel}}</span>
        </p>
      </div>
      <div class="ordercont_time">
          <div class="ordercont_time_ok">
              <div>
                  <p >送达时间</p>
                  <p class="ordercont_time_zs">蜂鸟专送</p>
              </div>
              <div class="ordercont_time_b">
                  尽快送达({{h}}：{{(m > 10)?m:"0"+m}}送达)
              </div>
          </div>
          <div class="ordercont_time_payment">
              <p>支付方式</p>
              <p class="ordercont_time_b">在线支付</p>
          </div>
      </div>
      <div class="ordercont_cart">
          <div class="ordercont_cart_title">
              <h3>红人系鲜花店</h3>(123)
          </div>
          <ul class="ordercont_cart_cont">
              <li>
                  <img src="https://fuss10.elemecdn.com/8/de/b86a6d94a6eade75083122371bc49png.png?imageMogr/format/webp/thumbnail/!72x72r/gravity/Center/crop/72x72/" alt="">
                  <p class="ordercont_cart_cont_text">33只玫瑰花礼遇装</p>
                  <p class="ordercont_num">x1</p>
                  <p class="ordercont_price">￥555</p>
              </li>
          </ul>
          <div class="ordercont_cart_buttom">
              <ul class="ordercont_cart_buttom_Delivery">
                  <li>
                      <div>
                          <p class="ocbd1">商家</p>
                           <span>配送费</span>
                      </div>
                      <span>￥5</span>
                  </li>
                   <li>
                       <div>
                           <p class="ocbd2">新客</p>
                            <span>本店新客立减</span>
                       </div>
                      <span style="color:#ff4a07">-￥3</span>
                  </li>
                  <li>
                      <div>红包</div>
                      <p class="redEnvelopes">
                          选择地址后使用红包
                      </p>
                  </li>
              </ul>
          </div>
          <div class="ordercont_cart_num">
            <p class="ordercont_cart_num_text">优惠说明？</p>
            <p class="ordercont_cart_num_zprice"><span>小计￥</span>1695</p>
          </div>
      </div>
      <div class="ordercont_buttom">
          <ul>
              <li>
                  <p>订单备注</p>
                  <p>口味、偏好
                    <span>
                        <van-icon name="arrow"/>
                    </span>
                  </p>
              </li>
               <li>
                  <p>发票信息</p>
                  <p>不需要开发票
                    <span>
                        <van-icon name="arrow"/>
                    </span>
                  </p>
              </li>
              <li class="ordercont_buttom_con">
                  <p>号码保护?</p>
                  <p>号码保护中，将对商家、骑手隐藏您的真实手机号</p>
              </li>
          </ul>
      </div>
    </div>
    <van-submit-bar
    :price="3050"
    button-text="去支付"
    @submit="onSubmit"
    />
  </div>
</template>

<script>
export default {
    data () {
        return {
            h:"",
            m:""
        }
    },
    created () {
        this.getH()
    },
    computed: {
        address(){
            return this.$store.state.confirmOeder.address
        }  
    },
  methods: {
    onClickLeft() {},
    onSubmit(){//跳转结算页
        this.$router.push("/components/payment")
    },
    addre(){//跳转选择地址页
        this.$router.push("/components/chooseAddress/chooseAddress")
    },
    getH(){//计算送达时间
        let mydate= new Date();
        let hs = mydate.getHours();
        let ms = mydate.getMinutes();
       if(ms+30 > 60){
           if(hs == 12){
               this.h = 1;
               this.m = ms+30-60;
           }else{
               this.h = hs+1;
           this.m = ms+30-60;
           }  
       }else{
           this.h = hs;
           this.m = ms+30
       }
    }
  }
};
</script>

<style>
/* van-submit-bar__bar */
.van-submit-bar__bar{
    background: #3c3c3c;
}
.van-submit-bar__text,.van-submit-bar__price{
    color: #fff;
}
.van-button--danger{
    background: #00e067;
    border:none;
}

/* ordercont_buttom */
.ordercont_buttom{
    margin-top: .3rem;
    font-size: .28rem;
    background: #fff;
    height: 3rem;
     padding: 0 .3rem;
}
.ordercont_buttom>ul>li{
   padding: .3rem 0 ;
    display: flex;
    justify-content: space-between;
}
.ordercont_buttom>ul>li>p:nth-of-type(2){
    color: #aaa;
}
.ordercont_buttom_con{
    display: flex;
    flex-direction: column;
}
.ordercont_buttom_con>p:nth-of-type(2){
    font-size: .24rem;
}
/* ordercont_cart_buttom */
.ordercont_cart_buttom{
    border-bottom: 1px solid #eee;
}
.ordercont_cart_buttom_Delivery>li{
    display: flex;
    justify-content: space-between;
   padding: .3rem 0;
}
.ordercont_cart_buttom_Delivery>li>div{
    display: flex;
}
.ocbd1{
    background: #60acf4;
}
.ocbd2{
    background:  rgb(0, 183, 98);
}
.ocbd1,.ocbd2{
    width: .7rem;
    color: #fff;
    font-size: .20rem;
    text-align: center;
    margin-right: .2rem;
}
.redEnvelopes{
    background-image: linear-gradient(106deg,#ff7417,#ff3c15);
    color: #fff;
    font-size: .24rem;
}
.ordercont_cart_num{
    display: flex;
    height: 1.5rem;
    line-height: 1.5rem;
    justify-content: space-between;
}
.ordercont_cart_num_text{
    color: #aaa;
}
.ordercont_cart_num_zprice{
    font-size: .36rem;
}
.ordercont_cart_num_zprice>span{
    font-size: .28rem;
}
/* ordercont_cart */
.ordercont_cart{
    font-size: .28rem;
    background: #fff;
    padding: 0 .3rem;
    margin-top: .2rem;
}
.ordercont_cart_title{
    display: flex;
    height: .8rem;
    border-bottom: 1px solid #eee;
    line-height: .8rem;
}
.ordercont_cart_cont>li{
    display: flex;
    height: 1.4rem;
    line-height: 1.4rem;
    justify-content: space-between;
}
.ordercont_cart_cont>li>img{
    padding: .2rem;
    width: 1rem;
    height: 1rem;
}
.ordercont_cart_cont_text{
    width:3rem ;
    font-size: .24rem;
    overflow:hidden; 
    text-overflow:ellipsis; 
    white-space:nowrap;
}

.van-nav-bar {
  background-image: linear-gradient(90deg, #0af, #0085ff);
}
.van-nav-bar__title{
  color: #fff;
  font-weight: bold;
}
.van-nav-bar .van-icon,
.van-nav-bar__text {
  color: #fff;
}
.orderbox{
    height: 18rem;
  background-image: linear-gradient(
      0deg,
      #f5f5f5,
      #f5f5f5 65%,
      hsla(0, 0%, 96%, 0.3) 75%,
      hsla(0, 0%, 96%, 0)
    ),
    linear-gradient(270deg, #0085ff, #0af);
}
.ordercont{
    width: 94%;
    margin: 0 auto;
}
.ordercont_address{
    height: 1.45rem;
    font-size: 0.28rem;
    color: #fff;
    padding: .2rem .1rem;
}
.ordercont_address>h3{
    display: flex;
    margin-top: .1rem;
}
.ordercont_address>h3>p{
    margin: 0;
    font-size: .36rem;
    overflow:hidden; 
    text-overflow:ellipsis; 
    white-space:nowrap;
}
.ordercont_address > h3 span{
    padding-top: .1rem;
    margin-left: .2rem;
}
.ordercont_tel{
    margin-top: .1rem;  
}
.ordercont_tel>span{
    margin-right: .1rem;
}
/* ordercont_time_ok */
.ordercont_time{
padding: .2rem .3rem;
    font-size: .30rem;
    background: #fff;
}
.ordercont_time_ok,.ordercont_time_payment{
    display: flex;
    justify-content: space-between;
    margin-bottom: .3rem;
}
.ordercont_time_b{
    color: #0085ff;
}
.ordercont_time_zs{
    width: 1rem;
    font-size: .20rem;
    background: #0af;
    color: #fff;
}
</style>
