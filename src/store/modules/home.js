import axios from '../../axios'

export default {
    namespaced:true,
    state:{
        guess:'',
        hotCity:[],
        cityAll:[],
        searchAddr:[],
        cityTopName:''
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
            axios.get('/v1/cities?type=guess').then(res => {
                console.log(res)
                commit('getGuess',res.data);
            })
        },
        getHot({commit}){
            axios.get('/v1/cities?type=hot').then(res => {
                // console.log(res)
                commit('getHot',res.data);
            })
        },
        getAll({commit}){
            axios.get('/v1/cities?type=group').then(res => {
                // console.log(res.data)
                // this.cityAll = this.formatCities(res.data);
                commit('getAll',res.data);
            })
        },
        search({commit},city){
            console.log(city);
            axios.get('/v1/pois?city_id='+city.city_id+'&keyword='+city.keyword).then(res => {
                console.log(res)
                commit('searchAddr',res.data);
            })
        },
        cityTop({commit},data){
            commit('cityTop',data.name);
        }
    }
}