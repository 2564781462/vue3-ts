//引入封装好的axios
import service from "./index";

//登录接口
interface loginData {
    uname:string
    password:string
}
export function login(data:loginData){
    return service({
        url:'/login',
        method:'post',
        data
    })
}

//获取商品数据接口
export function getGoods(){
    return service({
        url:'/goods',
        method:'get'
    })
}

//获取角色列表（权限）
export function getRole(){
    return service({
        url:'/role',
        method:'get'
    })
}
//获取用户列表
export function getUserInfo(){
    return service({
        url:"/userInfo",
        method:'get'
    })
}
