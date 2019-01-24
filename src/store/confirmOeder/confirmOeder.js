import axios from "../../axios"
const state = {
  addressList: [], //收货地址列表
  disabledList: [{//无法送达收货地址列表
        id: "3",
        name: "王五",
        tel: "1320000000",
        address: "浙江省杭州市滨江区江南大道 15 号"
    }
  ],
  address: [],
  addressinfo: {
    id:"",
    name:"",
    tel:"",
    province:"",
    city:"",
    county:"",
    addressDetail:""
  }//修改收货信息初始值

}
const getters = {

}
const actions = {
  addressList({commit}) { //获取收货地址列表
    return new Promise((resolve, reject) => {
      axios.get("http://elm.cangdu.org/v1/users/33/addresses").then((res) => {
        commit("addressList",res)
        resolve()
      })
    })
  },
  newAddress({ commit },val,id) { //添加收货地址
    return new Promise((resolve, reject) => {
      let uid=parseInt(id)
      axios.post("http://elm.cangdu.org/v1/users/33/addresses", 
        {
          address: val.addressDetail,
          address_detail: val.addressDetail,
          geohash: "31.730302,118.876018",
          name: val.name,
          phone: val.tel,
          tag: "家",
          sex: "1",
          poi_type: 0,
          phone_bk: "",
          tag_type:2
        }).then((res) => {
          resolve()
      })
    })
  },
  deleteAddress({commit ,state},val) { 
    console.log(val)
    let address_id = state.addressList[val.id].id
    console.log(address_id)
    return new Promise((resolve, reject) => {
      axios.delete("http://elm.cangdu.org/v1/users/" + val.id + "/addresses/" + address_id + "").then((res) => {
        resolve()
      })
    })
  }
}
const mutations = {
  addressList(state, res) { 
    state.addressList = res.data
    state.addressList.filter(res => { 
      return res.tel=res.phone
    })
  },
  receivingAddress(state, { item, index }) { //存储收货地址
    
    state.address = item 
   
    console.log(state.address)
  },
  modifyAddress(state, { item, index }) { //修改收货地址
    state.addressinfo.id = index;
    state.addressinfo.name = item.name;
    state.addressinfo.tel = item.tel;
    // 转换地区格式
     let addr = item.address.split("区")
    // let addprovince = addr[0].split("省")
    // let addpcity = addprovince[1].split("市")
    // let addparea = addpcity[1].split("区")[0]
    // state.addressinfo.province = addprovince[0];
    // state.addressinfo.city = addpcity[0];
    // state.addressinfo.county = addparea[0];
    state.addressinfo.addressDetail = addr[1];//区后边的地址
  },
  preservationAddress(state,val) {//修改完毕保存收货地址 
    state.addressList[val.id].name = val.name;
    state.addressList[val.id].tel = val.tel;
    state.addressList[val.id].address = val.province + val.city + val.county + val.addressDetail;
  },
  empty(state) {//新添加清除存储信息
    state.addressinfo = {
      id: "",
      name: "",
      tel: "",
      province: "",
      city: "",
      county: "",
      addressDetail: ""
    }
  },
  newtime(state) { 

  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}