import axios from '../../axios'

export default {
    namespaced:true,
    state:{
        guess:'',
        hotCity:[],
        cityAll:[],
        searchAddr:[],
        cityTopName:'',
        addHistory:[]
    },
    mutations:{
        getGuess(state,data){
            state.guess = data;
        },
        getHot(state,data){
            state.hotCity = data;
        },
        getAll(state,data){
            state.cityAll = data;
        },
        searchAddr(state,data){
            state.searchAddr = data;
        },
        cityTop(state,name){
            state.cityTopName = name;
        },
        clearSearch(state){
            state.searchAddr = []
        }
    },
    actions:{
        getGuess({commit}){
            return new Promise((resolve,reject) => {
                axios.get('/v1/cities?type=guess').then(res => {
                    // console.log(res)
                    commit('getGuess',res.data);
                    resolve();
                })
            })
        },
        getHot({commit}){
            return new Promise((resolve,reject) => {
                axios.get('/v1/cities?type=hot').then(res => {
                    // console.log(res)
                    commit('getHot',res.data);
                    resolve();
                })
            })
        },
        getAll({commit}){
            return new Promise((resolve,reject) => {
                axios.get('/v1/cities?type=group').then(res => {
                    // console.log(res.data)
                    // this.cityAll = this.formatCities(res.data);
                    commit('getAll',res.data);
                    resolve();
                })
            })
        },
        search({commit},city){
            return new Promise((resolve,reject) => {
                axios.get('/v1/pois?city_id='+city.city_id+'&keyword='+city.keyword).then(res => {
                    // console.log(res)
                    commit('searchAddr',res.data);
                    resolve();
                })
            })
        },
        cityTop({commit},data){
            commit('cityTop',data.name);
        }
    }
}