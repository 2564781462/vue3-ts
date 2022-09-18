import axios from "axios";
//创建axios实例
const service = axios.create({
    baseURL:'https://www.fastmock.site/mock/8ce47816bcea73b189ad438a56c5b857/api',
    timeout:5000,
    headers:{
        "content-Type":"application/json;charset=utf-8"
    }
})

//请求拦截
service.interceptors.request.use((config)=>{
    config.headers = config.headers || {}
    //携带token发请求
    if (localStorage.getItem("token")){
        config.headers.token = localStorage.getItem("token") || ""
    }
    return config
})

//响应拦截
service.interceptors.response.use((res)=>{
    // const code:number = res.data.code
    const status:number = res.status
    if (status != 200){
        return Promise.reject(res.data)
    }
    return res.data
},(error => {
    console.log(error)
}))

export default service