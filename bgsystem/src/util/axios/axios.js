import axios from 'axios'
import router from '../../router'
const http = axios.create({
    baseURL: '/api'
})

http.interceptors.request.use(req => {
    let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {};
    req.headers.authorization = userInfo.token;
    // req.headers.authorization = 111;
    return req;
})
http.interceptors.response.use(res => {
    if (res.data.code == 403) {
        alert(res.data.msg);
        router.push("/login");
        return res;
    } else if (res.data.code == 500) {
        alert(res.data.msg);
        router.push("/login");
        return res;
    } else {
        return res;
    }
})
export default http