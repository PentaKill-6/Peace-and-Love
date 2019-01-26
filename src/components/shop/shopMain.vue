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
      
      <div class="scroll-list-wrap" v-else>
        <cube-scroll
          ref="scroll"
          :options="options"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp">
          <div class="comment">
            <div class="score">
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
            <ul class="comment-list">
              <li v-for="(comment, index) in comments" :key="index" class="comment-box">
                <img :src="setAvatar(comment.avatar)" alt="">
                <div>
                  <div class="comment-title">
                    <p>
                      <span>{{comment.username}}</span>
                      <span>{{comment.rated_at}}</span>
                    </p>
                    <p>
                      <img src="../../../public/img/star.png" alt="">
                      <span>{{comment.time_spent_desc}}</span>
                    </p>
                  </div>
                  <div class="comment-cont">
                    <img :src="setImage (item.image_hash)" alt="" v-for="(item, i) in comment.item_ratings" :key="i" v-show="item.image_hash !== ''">
                  </div>
                  <div class="comment-tag">
                    <span v-for="(item, i) in comment.item_ratings" :key="i">{{item.food_name}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </cube-scroll>
      </div>
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
      tagIndex: 0,
      comments: [],
      avatar: 'https://fuss10.elemecdn.com',
      defaultImg: 'http://elm.cangdu.org/img/default.jpg'
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
        // console.log(this.tags)
      } catch(err) {

      }
    },
    async getComments () {
      try {
        await this.$store.dispatch('shop/getComments');
        this.comments = this.$store.state.shop.comments;
      } catch(err) {

      }
      // http://elm.cangdu.org/img/default.jpg
      // https://fuss10.elemecdn.com/1/5f/6cf782b0c9cd5ca8daa7f76ab05aejpeg.jpeg
    },
    setAvatar (avatar) {
      if (avatar === '') {
        return this.defaultImg;
      } else {
        return this.avatar+'/'+avatar.slice(0,1)+'/'+avatar.slice(1,3)+'/'+avatar.slice(3)+'.jpeg';
      }
    },
    setImage (imgHash) {
      if (imgHash === '') {
        return
      } else {
        return this.avatar+'/'+imgHash.slice(0,1)+'/'+imgHash.slice(1,3)+'/'+imgHash.slice(3)+'.jpeg';
      }
    } ,
     onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.items.unshift(_foods[1])
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    onPullingUp() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          let newPage = _foods.slice(0, 5)
          this.items = this.items.concat(newPage)
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
  },
  computed: {
    options() {
      return {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      }
    }
  },
  created () {
    this.getMenu();
    this.getScore();
    this.getTags();
    this.getComments();
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
  .comment>.score {
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
  .comment-list {
    background-color: #fff;
    padding: 0 0.25rem;
  }
  .comment-box {
    border-top: 0.01rem solid #f1f1f1;
    padding: 0.3rem 0;
    display: flex;
  }
  .comment-box>img {
    width: 0.7rem;
    height: 0.7rem;
    margin-right: 0.4rem;
    border-radius: 50%
  }
  .comment-box div {
    width: 100%;
  }
  .comment-box .comment-title {
    height: 0.64rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .comment-box div>p {
    width: 100%;
    color: #666;
  }
  .comment-box div>p:nth-child(1) {
    display: flex;
    justify-content: space-between;
    font-size: 0.24rem;
  }
  .comment-box div>p:nth-child(2) {
    font-size: 0.28rem;
  }
  .comment-box div>p:nth-child(2) >img {
    width: 0.9rem;
    height: 0.18rem;
  }
  .comment-cont>img {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 0.1rem;
  }
  .comment-tag>span {
    display: inline-block;
    width: 1.04rem;
    height: 0.56rem;
    line-height: 0.56rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.24rem;
    color: #999;
    margin-right: 0.1rem;
    border: 0.01rem solid #ebebeb;
    padding: 0 0.1rem;
  }
  .scroll-list-wrap {
    height: 100%;
  }
</style>