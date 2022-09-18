//请求接口返回的数据
export interface listInt {
    uid:number,
    id:number,
    title:string,
    desc:string
}
//搜索需要的数据
interface selectDataInt {
    title:string;
    desc:string;
    page:number; //页码
    count:number; //总条数
    pagesize:number; //默认显示几条
}
class intData {
    selectData:selectDataInt = {
        title:'',
        desc:'',
        page:1,
        count:0,
        pagesize:10
    };
    list:listInt[] = [] //展示的内容数据
}

export {intData}