<template>
  <div class="chooseAddress_box">
    <van-nav-bar title="选择地址" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
        />
  </div>
  
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      chosenAddressId: "1"
    };
  },
  created () {
    this.$store.dispatch("confirmOeder/addressList")
  },
  computed: {
    addressList(){
      return this.$store.state.confirmOeder.addressList
    },
    disabledList(){
      return this.$store.state.confirmOeder.disabledList
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push("/components/confirmOrder")
    },
    onAdd() {//跳转添加地址页
      this.$router.push("/components/chooseAddress/addAddress")
      this.$store.commit("confirmOeder/empty")//清空存储信息
    },
    onEdit(item, index) {
     this.$store.commit("confirmOeder/modifyAddress",{item,index})
       setTimeout(()=>{//延迟1s 跳转 下单页面
        this.$router.push("/components/chooseAddress/addAddress")
      },500)
    },
    select(item,index){
      this.$store.commit("confirmOeder/receivingAddress",{item,index})
      setTimeout(()=>{//延迟1s 跳转 下单页面
        this.$router.push("/components/confirmOrder")
      },1000)
    }

  }
};
</script>

<style>
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
</style>
