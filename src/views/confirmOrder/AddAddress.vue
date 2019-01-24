<template>
    <div>
         <van-nav-bar title="添加收货地址" left-text="返回" left-arrow  @click-left="onClickLeft"/>
        <van-address-edit
            :area-list="areaList"
            :address-info="addressinfo"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
            />
    </div>
</template>

<script>
import { AddressEdit } from 'vant';
import areaList from "./areaList"
import { Toast } from 'vant';
export default {
  data() {
    return {
      areaList,
      searchResult: []
    }
  },
  computed: {
    addressinfo(){
     return this.$store.state.confirmOeder.addressinfo
    }
  },
  created () {
      
  },
  methods: {
    onSave(val) {
      if(this.addressinfo.id){//验证是否存在id id若不存在则证明为新加否则修改
           this.$store.commit("confirmOeder/preservationAddress",val)
      }else{//id是user_id用户id
        this.$store.dispatch("confirmOeder/newAddress",val,33).then((res)=>{
              this.$router.push("chooseAddress")
              Toast("添加成功")
        })
      }
       setTimeout(()=>{
        
        },500)
    },
    onDelete(val) {
        val.user_id=33
      console.log(val)
      this.$store.dispatch("confirmOeder/deleteAddress",val).then((res)=>{
        this.$router.push("/components/chooseAddress/chooseAddress")
        Toast('删除成功');
      })
      
    },
    onChangeDetail(val) {//详细地址提示
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }];
      } else {
        this.searchResult = [];
      }
    },
    onClickLeft(){//跳回地址页 不做更改
      this.$router.push("chooseAddress") 
    }
  }
}

</script>

<style>
/* ===================== */
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
