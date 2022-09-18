export interface roleInt {
    authority:number[]
    roleId:number
    roleName:string
}
class roleData {
    list:roleInt[] = []
}
export {roleData}