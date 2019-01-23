<template>
    <div>
        <div class="city-header">
            <router-link to="/home">&lt;</router-link>
            <span>{{cityTop}}</span>
            <router-link to="/home">切换城市</router-link>
        </div>
        <div class="city-body">
            <input v-model="cityAddr" type="text" placeholder="输入学校、商务楼、地址">
            <button @click="search">提交</button>
        </div>
        <div class="history-top" v-if="!searchAddr.length">搜索历史</div>
        <div class="searchAddr">
            <div @click="goToMsite(addr)" class="addrList" v-for="(addr,index) in searchAddr" :key="index">
                <span>{{addr.name}}</span>
                <span>{{addr.address}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../axios'
export default {
    data(){
        return {
            cityAddr:''
        }
    },
    computed:{
        searchAddr(){
            return this.$store.state.home.searchAddr
        },
        cityTop(){
            return this.$store.state.home.cityTopName;
        }
    },
    methods:{
        
        search(){
            const city = {
                city_id:this.$route.params.cityid,
                keyword:this.cityAddr
            }
            this.$store.dispatch('home/search',city);
        },
        goToMsite(addr){
            console.log(addr) // 点击所对应的地址的数据
            localStorage.setItem('historyAddr',JSON.stringify(addr));
            this.$router.push('/msite?geohash='+addr.geohash)
        }
    },
    created(){
        
    }
}
</script>

<style scoped>
.city-header{
    padding: 0.2rem;
    color: #fff;
    background: #3190e8;
    font-size: 0.4rem;
    display: flex;
    justify-content: space-between;
}
.city-header a{
    font-size: 0.5rem;
    color: #fff;
}
.city-header span:nth-child(2){
    font-weight: bold;
    line-height: 0.6rem;
}
.city-header a:last-child{
    font-size: 0.32rem;
    line-height: 0.6rem;

}
.city-body{
    margin-top: 0.2rem;
    border-top: 0.01rem solid #e4e4e4;
    background: #fff;
    font-size: 0.3rem;
    display: flex;
    flex-direction: column;
    padding: 0.2rem;
    border-bottom: 0.04rem solid #e4e4e4;
}
.city-body input{
    margin-bottom: 0.2rem;
    /* line-height: 0.6rem; */
    padding: 0.2rem;
    border-radius: 0.15rem;
    outline: none;
}
.city-body button{
    border:none;
    background: #3190e8;
    color: #fff;
    padding: 0.2rem;
    border-radius: 0.08rem;
}
.searchAddr{
    border-top: 0.04rem solid #e4e4e4;
    border-bottom: 0.01rem solid #e4e4e4;
    font-size: 0.36rem;
    background: #fff;
    /* padding: 0.2rem; */
}
.addrList{
    display: flex;
    flex-direction: column;
    padding: .4rem;
    border-bottom: 0.01rem solid #e4e4e4;
}
.addrList span:first-child{
    color: #333;
}
.addrList span:last-child{
    color: #999;
    font-size: 0.24rem;
    margin-top: 0.1rem;
}
.history-top{
    font-size: 0.26rem;
    padding: 0.1rem 0.2rem;
}
</style>
