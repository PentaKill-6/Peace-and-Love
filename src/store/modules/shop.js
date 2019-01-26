import axios from '../../axios';

export default {
  namespaced: true,
  state: {
    shop: {},
    menu: [],
    score: {},
    tags: []
  },
  actions: {
    getData ({commit}) {
      return new Promise((resolve, reject) => {
        // axios.get('/shoping/restaurantslatitude=31.22967&longitude=121.4762').then(res => {
        //   console.log(res);
        //   resolve();
        // })
        axios.get('http://elm.cangdu.org/shopping/restaurant/1').then(res => {
          // console.log(res);
          if (res.status === 200) {
            commit('setData', res.data);
            resolve();
          } else {
            reject(err);
          }
        })
      })
    },
    getMenu ({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('http://elm.cangdu.org/shopping/v2/menu?restaurant_id=1').then(res => {
          // console.log(res);
          if (res.status === 200) {
            commit('setMenu',res.data)
            resolve();
          } else {
            reject("请求超时");
          }
        })
      })
      // 链式操作
      // .then((resolve, reject) => {
      //   axios.get('http://elm.cangdu.org/shopping/v2/menu?restaurant_id=1').then(res => {
      //     // console.log(res);
      //     if (res.status === 200) {
      //       commit('setMenu',res.data)
      //       resolve();
      //     } else {
      //       reject(err);
      //     }
      //   })
      // })
    },
    getScore ({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('http://elm.cangdu.org/ugc/v2/restaurants/1/ratings/scores').then(res => {
          // console.log(res);
          if (res.status === 200) {
            commit('setScore', res.data);
            resolve();
          } else {
            reject("请求超时")
          }
        })
      })
    },
    getTags ({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('http://elm.cangdu.org/ugc/v2/restaurants/1/ratings/tags').then(res => {
          // console.log(res);
          if (res.status === 200) {
            commit('setTags', res.data);
            resolve();
          } else {
            reject(err);
          }
        })
      })
    }
  },
  mutations: {
    setData (state, shop) {
      state.shop = shop;
      // console.log(state.shop)
    },
    setMenu (state, menu) {
      state.menu = menu;
      // console.log(state.menu)
    },
    setScore (state, score) {
      state.score = score;
    },
    setTags (state, tags) {
      state.tags = tags;
    }
  }
}