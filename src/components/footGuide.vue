<template>
    <div class="foot_guide">
        <router-link  to="/msite" class="guide_item">
          <span class="iconfont icon-elmyhq"></span>
          <span>外卖</span>
        </router-link>
        <router-link  to="/search" class="guide_item">
          <span class="iconfont icon-zhinanzhen"></span>
          <span>搜索</span>
        </router-link>
        <router-link  to="/confirmOrderr" class="guide_item">
          <span class="iconfont icon-icon-"></span>
          <span>订单</span>
        </router-link>
        <router-link  to="/profile" class="guide_item">
          <span class="iconfont icon-wode"></span>
          <span>我的</span>
        </router-link>
    </div>
</template>

<script>
export default {
    data(){
      return {
        geohash:'31.22299,121.36025'
        
      }
    },
     methods: {
        	gotoAddress(path){
        		this.$router.push(path)
        	}
        },
}
</script>

<style>
    
     .foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        /* @include wh(100%, 1.95rem); */
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_item{
    	flex: 1;
    	display: flex;
    	text-align: center;
    	flex-direction: column;
    	align-items: center;		
			margin-top: .1rem;
			fill: #ccc;		
      height: 0.6rem;
    }
    .guide_item .iconfont{
      font-size: 0.3rem;
      display: block;
    }
    .guide_item span{
      font-size: 0.2rem;
      color: #666; 
    }
    .router-link-active span{
      color: #3190e8 ;
    }
</style>
