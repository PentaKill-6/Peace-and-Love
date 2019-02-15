<template>
  <div class="head">
    <router-link to="" class="shop-head" tag="div">
      <img :src="imgurl" alt="">
      <div>
        <h4>{{shop.name}}</h4>
        <span>商家配送/分钟必达/{{tips}}</span>
        <span>公告: {{shop.promotion_info}}</span>
      </div>
    </router-link>
    <img :src="imgurl" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
      shop: {},
      imgurl: '//elm.cangdu.org/img/',
      tips: '',
      choose: true
    }
  },
  methods: {
    getData () {
      // console.log(this.$route.query)
      this.$store.dispatch('shop/getData', this.$route.query.id).then(() => {
        this.shop = this.$store.state.shop.shop;
        this.imgurl = this.imgurl + this.shop.image_path;
        this.tips = this.shop.piecewise_agent_fee.tips;
      })
    }
    // async getData () {
    //   try {
    //     await this.$store.dispatch('shop/getData');
    //     this.shop = this.$store.state.shop.shop;
    //     this.imgurl = this.imgurl + this.shop.image_path;
    //     this.tips = this.shop.piecewise_agent_fee.tips;
    //     // console.log(this.shop)
    //   } catch(err) {
    //     // console.log(err)
    //   }
    // }
  },
  created () {
    this.getData();
  }
}
</script>

<style>
  .head {
    z-index: 10;
    height: 1.8rem;
    overflow: hidden;
    position: relative;
    top: 0;
  }
  .head>img {
    width: 100%;
    z-index: 1;
    position: absolute;
    top: 0;
  }
  .shop-head {
    display: flex;
    width: 100%;
    height: 1.8rem;
    font-size: 0.4rem;
    color: #fff;
    padding: 0.18rem;
    background-color: rgba(119,103,137,.43);
    position: absolute;
    top: 0;
    z-index: 5;
  }
  .shop-head>img {
    width: 1.36rem;
    height: 1.36rem;
    margin-right: 0.3rem;
  }
  .shop-head>div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  } 
  .shop-head>div>span{
    font-size: 0.12rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
