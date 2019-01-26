<template>
    <div>
        <head-top>           
        </head-top>
        <van-swipe :autoplay="3000" indicator-color="white" class="swipter">
            <van-swipe-item class="itemfirst foods ">
                <div v-for="(item,index) in foodTypes[0]" :key="index" class="foodtype">
                    <img :src="imgurl+item.image_url" alt="">
                   <span>{{item.title}}</span>
                </div>
            </van-swipe-item>
            <van-swipe-item class="itemsec foods">
                <div v-for="(item,index) in foodTypes[1]" :key="index" class="foodtype">
                    <img :src="imgurl+item.image_url" alt="">
                   <span>{{item.title}}</span>
                </div>
            </van-swipe-item>
        </van-swipe>
        <div class="shops">
            <div class='title'>附近商家</div>
            <router-link class='shop' v-for="(shop,index) in resturants" :key="index" :to="'/shop?id='+shop.id">
                <img :src="imgpath+shop.image_path" alt="" class="azai">
                <div class='shop-body'>
                    <div class='shop-top shop-flex'>
                        <div>
                            <span class='brand'>品牌</span>
                            <span class='name'>{{shop.name}}</span>
                        </div>
                        <div class='labels'>
                            <span v-for="(item,index) in shop.supports" :key="index">{{item.icon_name}}</span>
                        </div>
                    </div>
                    <div class='shop-middle shop-flex'>
                        <div>
                            <div class='shop-star'>
                                
                                
                                <div class='star'>
                                    <div class="imgs" :style="'width:'+shop.rating/5+'rem'">    
                                    </div>
                                </div>
                                
                            </div>
                            <span class='rate'>{{shop.rating}}</span>
                            <span class='sell'>月售{{shop.recent_order_num}}单</span>
                            </div>
                            <div class='label'>
                                <span>蜂鸟专送</span>
                            </div>
                        </div>
                    <div class='shop-bottom shop-flex'>
                        <span>￥{{shop.float_minimum_order_amount}}起送/配送费约￥{{shop.float_delivery_fee}}</span>
                        <div class="shop-feng">
                            <span>{{shop.distance}}/</span>
                            <span>{{shop.order_lead_time}}</span>
                        </div>
                    </div>
                </div>
                
            </router-link>
            <!-- <van-rate v-model="value"  class="star" :size="5"/> -->
        </div>
        
        <footGuide></footGuide>
    </div>
</template>

<script>
import axios from 'axios'
import headTop from '../../src/components/msitehead'
import footGuide from '../../src/components/footGuide'
export default {
    data(){
        return {
            value:[],
            geohash: '',
            foodTypes:[],
            msiteTitle: '请选择地址...',
            resturants:[],
            imgurl: 'https://fuss10.elemecdn.com',
            imgpath:'https://elm.cangdu.org/img/'
        }
    },
    methods: {
         formattypes(data) {
            const arr = []
            for(let i=0; i < data.length; i+=8){
            arr.push(data.slice(i,i+8))
            }
            return arr
        },

       
    },
    created(){
        axios.get('http://elm.cangdu.org/v2/index_entry?geohash=31.143657,121.660764&group_type=1').then(res => {
                // console.log(res.data)
                this.foodTypes =this.formattypes(res.data);
        })
        axios.get('http://elm.cangdu.org/shopping/restaurants?latitude=31.143657&longitude=121.660764&offset=0&limit=20').then( res=> {
            console.log(res.data)
            this.resturants = res.data
            this.value = this.resturants.rating
            
        })
         
    },
    components:{       
        headTop,
        footGuide
    }
}
</script>

<style>
    .swipter{
        margin-top:1rem;
    }
    
    .shop-bottom span {
        margin-left: -0.15rem;
        color: #888;
        transform: scale(.9);
        font-size: 0.05rem;
    }
    .shop-feng{
        /* width: 64rem; */
       display: flex;
       justify-content: space-between;
    }
    .shop-feng :first-child {
        color: #888;
        font-size: 0.06rem;
    }

    .shop-feng :last-child {
        color: #3190e8;
        font-size: 0.06rem;
        /* margin-right: -0.05rem; */
    }
    .label span{
        color: #fff;
        background-color: #3190e8;
        border: .025rem solid #3190e8;
        font-size: 0.2rem;
    }
    .sell {
        color: #999;
        font-size: 0.2rem;
    }
    .rate {
        color: #ff6000;
        font-size: 0.22rem;
        margin-right: 0.1rem;
    }
    .shop-star {
        display: inline-block;
        margin-right: 0.10rem;
        position: relative;
        height: 0.16rem;
        width: 1rem;
    }
    /* .star{
        width: 100%;
    } */
    .shop-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .shop-body {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .labels {
        color: #999;
        font-size: 0.2rem;
        letter-spacing: 0.06rem;
    }
    .shop .name {
        font-weight: bold;
    }
    .shop .brand {
        font-size: 0.24rem;
        display: inline-block;
        background: #ffd930;
        border-radius: 0.1rem;
        padding: 0 0.1rem;
        margin-right: 0.1rem;
    }
    .shop {
        display: flex;
        font-size: 0.28rem;
        padding: 0.20rem;
        border-bottom: 1px solid #eee;
    }
    .shop .azai {
        width: 1.26rem;
        height: 1.26rem;
        margin-right: 0.05rem;
        flex-shrink: 0;
    }
    .shop-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .shops {
        border-top: 1px solid #eee;
        margin-top: 0.4rem;
        background: #fff;
        padding: 0.05rem;
    }
    .shops .title {
        font-size: 0.28rem;
        color: #999;
        padding-bottom: 0.40rem;
    }
    .itemfirst,.itemsec{
        width: 375px;
        height: 186px;
        background:rebeccapurple;
    }
    .foods{
        display: flex;
        flex-wrap: wrap;
         width: 375px;
        height: 186px;
    }
    .foodtype{
        display: flex;
        width: 25%;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        padding:0.15rem 0;
    }
    .foodtype img{
        width: 0.84rem;
        height: 0.84rem;
        margin-bottom: 0.3rem;
    }
    .foodtype span{
        text-align: center;
        font-size: 0.30rem;
        
    }
    .van-rate__item{
        padding: 0;
    }
    .star{       
       width: 1rem;
       font-size: 0.2rem;
       height: 0.28rem;
       background: url("../../public/img/star2.png") no-repeat left center;   
       background-size: 1rem;   
    }
    .imgs{
        width: 1rem;
        font-size: 0.2rem;
        height: 0.28rem;
        background: url("../../public/img/star.png") no-repeat left center;   
        background-size: 1rem;
    }
    
</style>
