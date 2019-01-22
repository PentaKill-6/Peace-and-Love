<template>
    <div>
         <van-nav-bar title="添加收货地址" left-text="返回" left-arrow  @click-left="onClickLeft"/>
        <van-address-edit
            :area-list="areaList"
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
  created () {
      
  },
  methods: {
    onSave(val) {
        console.log(val)
      Toast('save');
    },
    onDelete() {
      Toast('delete');
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
    onClickLeft(){
       
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
