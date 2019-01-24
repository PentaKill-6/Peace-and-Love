import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://ele.kassing.cn' : 'www.xxx.com'
axios.defaults.withCredentials=true;
export default axios