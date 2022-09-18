
interface loginInt{
    uname:string
    password:string
}
class loginData {
    ruleForm:loginInt = {
        uname:'',
        password:''
    }
}
export {loginData}