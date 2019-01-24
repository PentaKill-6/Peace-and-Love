<template>
  <div class="paym_box">
    <van-nav-bar title="在线支付" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="paym_title">
      <p>支付剩余时间</p>
      <p>00:14.39</p>
      <div>
        <div>
          <p>皇堡(盘槐里店)外卖订单</p>
          <p>详情</p>
        </div>
        <p>￥101.80</p>
      </div>
    </div>
    <div class="paym_nav">其他支付</div>
    <van-radio-group v-model="radio">
        <div class="payment-list">
            <div>
                <svg viewBox="0 0 37 37" id="icon_alipay2_on" width="100%" height="100%"><path d="M34.99 24.405V9.028c0-3.315-2.755-6.005-6.15-6.005H9.158c-3.394 0-6.148 2.69-6.148 6.005v19.223c0 3.315 2.752 6.005 6.148 6.005h19.68c3.024 0 5.54-2.136 6.054-4.945-1.63-.69-8.698-3.67-12.38-5.386-2.801 3.315-5.736 5.304-10.158 5.304-4.423 0-7.375-2.66-7.022-5.917.234-2.138 1.735-5.632 8.255-5.033 3.436.315 5.008.941 7.81 1.845a21.307 21.307 0 0 0 1.785-4.248H10.758v-1.202h6.147v-2.16H9.407v-1.323h7.498V8.076s.068-.488.62-.488h3.074v3.603h7.994v1.324H20.6v2.159h6.521c-.6 2.383-1.508 4.574-2.648 6.487 1.895.67 10.517 3.244 10.517 3.244zm-23.125 2.763c-4.673 0-5.412-2.882-5.165-4.086.246-1.199 1.6-2.763 4.198-2.763 2.986 0 5.66.746 8.87 2.273-2.255 2.867-5.025 4.576-7.903 4.576z" fill="#009FE8" fill-rule="nonzero"></path></svg>
                <span>支付宝</span>
            </div>
            <van-radio name="1" checked-color="#07c160"></van-radio>
        </div>
        <div class="payment-list">
            <div>
                <svg viewBox="0 0 37 37" id="icon_wechatpay2_on" width="100%" height="100%"><path d="M15.2 22.15c-1.916 1.157-2.2-.65-2.2-.65l-2.4-6.066c-.924-2.884.799-1.3.799-1.3s1.478 1.211 2.6 1.95c1.122.738 2.4.216 2.4.216l15.693-7.846C29.197 4.551 24.414 2 19 2 10.163 2 3 8.79 3 17.167c0 4.82 2.372 9.107 6.066 11.886l-.666 4.15s-.325 1.21.8.648c.767-.382 2.723-1.755 3.887-2.59A16.726 16.726 0 0 0 19 32.335c8.836 0 16-6.79 16-15.167 0-2.427-.604-4.718-1.673-6.752-5 3.258-16.63 10.83-18.128 11.734z" fill="#41B035" fill-rule="nonzero"></path></svg>
                <span>微信支付</span>
            </div>
            <van-radio name="2" checked-color="#07c160"></van-radio>
        </div>
        <div class="payment-but">   
             <van-button type="primary" size="large">确认支付￥101.80</van-button>
        </div>
     
      
    </van-radio-group>
  </div>
</template>

<script>
export default {
    data() {
    return {
      radio: '1'
    }
  },
  methods: {
    onClickLeft() {}
  }
};
</script>

<style>
/* payment-but */
.payment-but{
    padding: 0 .3rem;
}
/* payment-list */
.payment-list{
    background: #fff;
    padding: .3rem;
    font-size: .28rem;
    border-bottom: 1px solid #eee;
    height: .7rem;
    line-height: .7rem;
    display: flex;
    justify-content: space-between;
}
.payment-list>div{
    display: flex;
}
.payment-list>div>svg{
    width: .96rem;
    height: .96rem;
    margin-right: .3rem;
}
/* paym_nav */
.paym_nav {
  font-size: 0.28rem;
  height: 1rem;
  line-height: 1rem;
  color: #999;
  padding-left: 0.3rem;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
  background: #f5f5f5;
}
/* paym_title */
.paym_title {
  padding: 0.3rem 0.3rem 0 0.3rem;
  font-size: 0.28rem;
  text-align: center;
  color: #aaa;
  height: 3rem;
  background: #fff;
}
.paym_title > p:nth-of-type(2) {
  font-size: 0.66rem;
  color: #000;
  padding: 0.3rem 0;
  border-bottom: 1px solid #eee;
}
.paym_title > div {
  padding: 0.3rem 0;
}
.paym_title > div,
.paym_title > div > div {
  display: flex;
  font-size: 0.32rem;
  justify-content: space-between;
  color: #000;
}
.paym_title > div > div > p {
  margin-right: 0.2rem;
}
.paym_title > div > div > p:nth-of-type(2) {
  color: #aaa;
}
.paym_title > div > p {
  color: #ff6000;
}
/* ================ */
.van-nav-bar {
  background-image: linear-gradient(90deg, #0af, #0085ff);
}
.van-nav-bar__title {
  color: #fff;
  font-weight: bold;
}
.van-nav-bar .van-icon,
.van-nav-bar__text {
  color: #fff;
}
.paym_box{
    background: #f5f5f5;
}
</style>
