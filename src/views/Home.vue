<template>
   <div>
        <div class="header">
            <span>ele.me</span>
            <router-link to="/login">登录 | 注册</router-link>
        </div>
        <div class="city-tip">
            <div class="city-top">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <div class="city-bot">
                <span @click="goToCity(guessCity)">{{guessCity.name}}</span>
                <span>></span>
            </div>
        </div>
        <div class="city-hot">
            <div class="hot-top">
                <span>热门城市</span>
            </div>
            <div class="hot-body">
                <span  @click="goToCity(hot)" v-for="hot in hotCity" :key="hot.id">{{hot.name}}</span>
            </div>
        </div>
        <div class="city-all" v-for="(all,index) in cityAll" :key="index">
            <p>{{all[0]}}</p>
            <div class="all-body">
                <span @click="goToCity(cities)" v-for="cities in all[1]" :key="cities.id">{{cities.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from '../axios'

export default {
    computed:{
        guessCity(){
            return this.$store.state.home.guess
        },
        hotCity(){
            return this.$store.state.home.hotCity
        },
        cityAll(){
            return this.formatCities(this.$store.state.home.cityAll)
        }
    },
    methods:{
        formatCities(cities){
            const arr = [];
            for(let key in cities){
                arr.push([key,cities[key]])
            }
            return arr.sort((a,b) => {
                if(a[0] > b[0]){
                    return 1;
                }else if(a[0] < b[0]){
                    return -1;
                }
            })
        },
        goToCity(data){
            // console.log(data);
            this.$store.dispatch('home/cityTop',data);
            this.$store.commit('home/clearSearch');
            this.$router.push('/city/'+ data.id);
        }
    },
    created(){
        this.$store.dispatch('home/getGuess');
        this.$store.dispatch('home/getHot');
        this.$store.dispatch('home/getAll');
    }
}
</script>

<style scoped>
/* 顶部 */
    .header{
        widows: 7.5rem;
        font-size: 0.3rem;
        background: #3190e8;
        padding:0.3rem 0.2rem 0.2rem 0.2rem;
        display: flex;
        justify-content: space-between;
        color: #fff;
    }
    .header a {
        color: #fff;
    }
    .city-tip{
        font-size: 0.26rem;
        background: #fff;
    }
    .city-top,.city-bot{
        padding: 0.3rem 0.2rem 0.2rem 0.2rem;
        display: flex;
        justify-content: space-between;
    }
    .city-top{
        border-bottom: 0.01rem solid #e4e4e4;
    }
    .city-top span:first-child{
        color: #666;
    }
    .city-top span:last-child{
        font-size: 0.24rem;
        color: #9f9f9f;
        font-weight: bold;
    }
    .city-bot{
        border-bottom: 0.04rem solid #e4e4e4;
    }
    .city-bot span:first-child{
        font-size: 0.32rem;
    }
    .city-bot span:last-child{
        font-size: 0.34rem;
        color: #9f9f9f;
    }

    .city-hot{
        margin-top: 0.2rem;
        border-top: 0.04rem solid #e4e4e4;
        background: #fff;
        font-size: 0.28rem;
        color: #666;
    }
    .hot-top{
        padding: 0.2rem 0.2rem 0.1rem 0.2rem;
    }
    .hot-body{
        margin-top: 0.1rem;
        border-top: 0.01rem solid #e4e4e4;
        display: flex;
        flex-wrap: wrap;
    }
    .hot-body span,.all-body span{
        width: 19.5%;
        padding: 0.2rem;
        text-align: center;
        border-bottom: 0.01rem solid #e4e4e4;
        border-right: 0.01rem solid #e4e4e4;
        color: #3190e8;
        font-size: 0.3rem;
    }
    .hot-body span:nth-child(4){
        border-right: none;
    }
    .hot-body span:last-child{
        border-right: none;
    }

/* 字母排序 */
    .city-all{
        margin-top: 0.2rem;
        background: #fff;
        border-top: 0.04rem solid #e4e4e4;
        font-size: 0.3rem;
        color: #666;
    }
    .city-all p{
        padding:0 0.2rem;
        font-size: 0.28rem;
    }
    .all-body{
        border-top: 0.01rem solid #e4e4e4;
        display: flex;
        flex-wrap: wrap;
    }
    .all-body a{
        color:#666;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
