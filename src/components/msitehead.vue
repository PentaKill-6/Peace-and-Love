<template>
    <div class="top">
        <router-link to="/home" slot="msite-title" class="msite_title">
			<span class="title_text ellipsis">{{msiteTitle}}</span>
		</router-link>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            geohash:'',
            msiteTitle: '',
        }
    },
    methods: {
        getAddress(){
          this.geohash = this.$route.query.geohash
          console.log(this.geohash)
          axios.get('/v2/pois/'+ this.geohash).then(res => {
            this.msiteTitle = res.data.name
        })
      }
    },
    created(){
      this.getAddress()
        
    }
}
</script>

<style>
    .top{
        background-color: rebeccapurple;
        position: fixed;
        z-index: 10;
        left: 0;
        top: 0;
        width: 100%;
        height: 1rem;
        font-size: 0.6rem;
        text-align: center;
        border:1px solid royalblue;
        margin-bottom: 0.2rem;
    }
</style>
