<template>
  <div class="shop-main">
    <div class="main-nav prepend-header" slot="prepend">
      <span v-for="(label, index) in navLabel" :key="index" :class="{active : i == index}" @touchstart="i = index">{{label}}</span>
    </div>
    <cube-scroll-nav
      :side="true"
      :current="current"
      @change="changeHandler"
      @sticky-change="stickyChangeHandler" v-if="i ===0">
        <!-- <ul class="prepend-header" slot="prepend">
          <li v-for="(label, index) in navLabel" :key="index">{{label}}</li>
        </ul> -->
        <cube-scroll-nav-panel
          v-for="item in menu"
          :key="item.id"
          :label="item.name" 
          :title="item.name"
          class="menu-item">
          <p class="menu-title" v-show="i === 0">
            <span>
              <strong>{{item.name}}</strong>
              {{item.description}}
            </span>
            <span>···</span>
          </p>
          <ul>
            <li class="menu-main" v-for="(food, i) in item.foods" :key="i">
              <div>
                <img :src="imgurl + food.image_path " alt="">
                <div class="menu-content">
                  <span>{{food.name}}</span>
                  <span>{{food.description}}</span>
                  <span>月售{{food.month_sales}}份   好评率{{food.satisfy_rate}}%</span>
                  <!-- <span>{{food.activity}}</span> -->
                  <p>
                    <span>￥{{food.specfoods[0].price}}起</span>
                    <button v-if="food.specfoods.length != 1">选规格</button>
                    <button v-else class="btn">+</button>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
      <div v-else class="comment">
        <div class="score-left">
          <span>{{score.overall_score.toFixed(1)}}</span>
          <span>综合评价</span>
          <span>高于周边商家{{(score.compare_rating*100).toFixed(1) + '%'}}</span>
        </div>
        <div class="score-right">
          <p>
            <span>服务态度</span>
            <cube-rate v-model="serviceScore" :disabled="disabled" :max="max" :justify="justify"></cube-rate>
            <span>{{score.service_score.toFixed(1)}}</span>
          </p>
          <p>
            <span>菜品评价</span>
            <cube-rate v-model="serviceScore" :disabled="disabled" :max="max" :justify="justify"></cube-rate>
            <span>{{score.food_score.toFixed(1)}}</span>
          </p>
          <p>
            <span>送达时间</span>
            <span>{{score.deliver_time}}分钟</span>
          </p>
        </div>
      </div>
      <div class="tag-list">
        <span v-for="(tag, index) in tags" :key="index" :class="[{unsatisfied : tag.unsatisfied},{active : tagIndex === index}]" @touchstart="tagIndex = index">
          {{tag.name+'('+ tag.count +')'}}
        </span>
      </div>
      <ul>
        <li></li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navLabel: ['商品','评价'],
      i: 0,
      menu: [],
      current: "",
      imgurl: '//elm.cangdu.org/img/',
      score: {},
      disabled: true,
      max: 5,
      serviceScore: null,
      justify: true,
      tags: [],
      tagIndex: 0
    }
  },
  components: {
    // CubePage
  },
  // data() {
  //   return {
  //     data: goods,
  //     current: goods[3].name
  //   }
  // },
  methods: {
    changeHandler(label) {
      // console.log('changed to:', label);
    },
    stickyChangeHandler(current) {
      console.log('sticky-change', current)
    },
    async getMenu () {
      try {
        await this.$store.dispatch('shop/getMenu');
        this.menu = this.$store.state.shop.menu;
        this.current = this.menu[0].name;
        // console.log(this.menu);
      } catch(err) {

      }
    },
    async getScore () {
      try {
        await this.$store.dispatch('shop/getScore');
        this.score = this.$store.state.shop.score;
        this.serviceScore = this.$store.state.shop.score.service_score;
        // console.log(this.score)
      } catch(err) {
        console.log(err)
      }
    },
    async getTags () {
      try {
        await this.$store.dispatch('shop/getTags');
        this.tags = this.$store.state.shop.tags;
        console.log(this.tags)
      } catch(err) {

      }
    }
  },
  computed: {
    
  },
  created () {
    this.getMenu();
    this.getScore();
    this.getTags();
  }
}
</script>

<style>
  .shop-main {
    font-size: 0.32rem;
    height: 10.46rem;
  }
  .shop-main>.main-nav {
    background-color: #fff;
    width: 7.5rem;
    height: 1.08rem;
    font-size: 0.32rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 0.02rem solid #e3e3e3;
  }
  .main-nav>span {
    display: inline-block;
    width: 0.69rem;
    height: 0.64rem;
    line-height: 0.64rem;
    text-align: center;
    color: #666;
    font-weight: 400;
    border-bottom: 0.06rem solid transparent;
  }
  .main-nav>.active {
    color: #3190e8;
    border-bottom: 0.06rem solid  #3190e8;
  }
  .menu-item .menu-main {
    width: 100%;
    height: 2.77rem;
    padding: 0.3rem 0.2rem;
    background-color: #fff;
  }
  .menu-item .menu-main>div {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .menu-main>div>img {
    width: 0.94rem;
    height: 0.94rem;
    margin-right: 0.3rem;
  }
  .menu-main .menu-content {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
  .menu-content>span {
    display: block;
  }
  .menu-content>span:nth-child(2) {
    color: #999;
    font-size: 0.24rem;
  }
  .menu-content>span:nth-child(3) {
    color: #666;
    font-size: 0.26rem;
  }
  .menu-content>p {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .menu-content>p>button {
    border: none;
    width: 1.08rem;
    height: 0.48rem;
    font-size: 0.30rem;
    border-radius: 0.08rem;
    background-color: #3190e8;
    color: #fff;
  }
  .menu-content>p>.btn {
    width: 0.48rem;
    border-radius: 50%;
  }
  .cube-sticky-fixed {
    width: 25%;
  }
  .cube-scroll-nav-bar-item {
    border-left: 0.1rem solid transparent;
    background-color: #f5f5f5;
  }
  .cube-scroll-nav-bar-item_active {
    border-left: 0.1rem solid  #3190e8;
    background-color: #fff;
  }
  .cube-sticky-content h2 {
    /* height: 1rem;
    line-height: 1rem;
    margin-left: 0.2rem;
    font-weight: 700; */
    display: none;
  }
  .menu-title {
    background-color: #f5f5f5;
    height: 1rem;
    line-height: 1rem;
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
  }
  .menu-title strong {
    color: #666;
    margin-right: 0.1rem;
    font-size: 0.4rem;
    font-weight: 700;
  }
  .menu-title>span {
    color: #999;
    font-size: 0.24rem;
  }
  .menu-title>span:nth-child(2) {
    font-size: 0.28rem;
  }
  .comment {
    height: 2.2rem;
    background-color: #fff;
    padding: 0.4rem 0.25rem;
    margin-bottom: 0.25rem;
    display: flex;
    width: 100%;
  }
  .score-left {
    width: 3rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100%;
    justify-content: space-between;
  }
  .score-left>span:nth-child(1) {
    font-size: 0.54rem;
    color: #f60;
    font-family: Helvetica Neue,Tahoma,Arial;
  }
  .score-left>span:nth-child(2) {
    font-size: 0.30rem;
    color: #666;
  }
  .score-left>span:nth-child(3) {
    font-size: 0.24rem;
    color: #999;
  }
  .score-right {
    width: 4rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .score-right>p {
    display: flex;
  }
  .score-right>p>span:nth-child(1) {
    color: #666;
    font-size: 0.30rem;
    margin-right: 0.2rem;
  }
  .score-right>p>span:nth-child(3) {
    font-size: 0.26rem;
    color: #f60;
    line-height: 0.32rem;
    margin-left: 0.2rem;
  }
  .score-right>p>span:nth-child(2) {
    color: #999;
    font-size: 0.26rem;
    margin-right: 0.2rem;
  }
  .cube-rate {
    display: flex;
    width: 1.16rem;
    height: 0.2rem;
    margin-top: 0.1rem;
  }
  .cube-rate-item {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    margin: 0;
  }
  .tag-list {
    width: 100%;
    height: 3.5rem;
    background-color: #fff;
    padding: 0.25rem;
    display: flex;
    flex-wrap: wrap;
  }
  .tag-list>span {
    display: inline-block;
    background-color: #ebf5ff;
    color: #6d7885;
    padding: 0.15rem;
    border-radius: 0.1rem;
    margin: 0 0.2rem 0.1rem 0;
    font-size: 0.28rem;
  }
  .tag-list>.unsatisfied {
    background-color: #f5f5f5;
    color: #aaa;
  }
  .tag-list>.active {
    background-color: #3190e8;
    color: #fff;
  }
</style>