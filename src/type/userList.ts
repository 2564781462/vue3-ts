
interface roleInt {
    role:number;
    roleName:string
}
export interface listInt {
    id:number;
    nickName:string;
    role:roleInt[];
    uname:string
}
interface selectDataInt {
    role:number;
    nickName:string
}
interface roleListInt {
    authority:number[];
    roleId:number;
    roleName:string
}
interface ActiveInt{
    id:number;
    nickName:string;
    role:number[];
    uname:string
}
export class userInfo {
    selectData:selectDataInt = {
        role:0,
        nickName:''
    }
    list:listInt[] = [] //用来接收用户信息列表
    roleList:roleListInt[] = [] //接收角色信息列表（权限）
    isShow = false
    active:ActiveInt = { //选中的对象
        id:0,
        nickName:'',
        role:[],
        uname:''
    }
}
