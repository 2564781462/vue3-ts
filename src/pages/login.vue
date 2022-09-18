<template>
  <div class="login-container">
    <div class="show-pass">
      <p>账户：ShangJian1 密码：123456</p>
      <p>账户：ShangJian2 密码：123456</p>
      <p>账户：ShangJian3 密码：123456</p>
      <p>账户：ShangJian4 密码：123456</p>
    </div>
    <div class="box">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="demo-ruleForm"
      >
        <h2 style="margin-bottom: 1vh;">后台管理系统</h2>
        <el-form-item label="账户：" prop="uname">
          <el-input v-model="ruleForm.uname" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录
          </el-button
          >
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref} from 'vue'
import type {FormInstance} from 'element-plus'
import {loginData} from '../type/login'
import {login} from '../request/api'
import {ElMessage} from 'element-plus'
import {useRouter} from "vue-router";

export default defineComponent({
  name:'login',
  setup() {
    const data = reactive(new loginData())
    const rules = {
      uname: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 5, max: 10, message: '用户名长度在5-10之间', trigger: 'blur'},
      ],
      password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 5, max: 10, message: '密码长度为5-10之间', trigger: 'blur'},
      ],
    }
    const ruleFormRef = ref<FormInstance>()
    const router = useRouter()
    //登录按钮
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          //请求数据
          const getLoginData = async () => {
            return login(data.ruleForm)
          }
          //校验数据
          getLoginData().then(function (res){
            try {
              let userDataList:string[] = []
              res.forEach((item) => {
                if (item.uname == data.ruleForm.uname && item.password == data.ruleForm.password) {
                  userDataList.push(item)
                }
              })
              if (userDataList.length != 0) {
                //将token值保存在localStorage
                localStorage.setItem("token",userDataList[0].token)
                //跳转首页
                router.push('/')
              } else {
                ElMessage({
                  showClose: true,
                  message: '账户或密码错误！',
                  type: 'error',
                })
              }
            }catch (err){
              console.log(err)
            }
          })
        } else {
          ElMessage({
            showClose: true,
            message: '用户或密码格式错误！',
            type: 'error',
          })
          return false
        }
      })
    }
    //重置按钮
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    return {...toRefs(data), ruleFormRef, submitForm, resetForm, rules}
  }
})

</script>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("../assets/bg.jpg") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .show-pass{
    background-color: rgba(192,192,192,0.8);
    position: absolute;
    top:20vh;
    left: 10vw;
    width: 25vw;
    height: 20vh;
    line-height: 5vh;
    text-align: center;
    border-radius: 10px;
    color: white;
  }
  .box {
    width: 30vw;
    height: 30vh;
    margin: 20vh 55vw;
    background-color: rgba(189,189,190,0.9);
    border-radius: 5px;
    overflow: hidden;

    .el-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2vh;

      .el-input {
        width: 20vw;
      }

      .el-form-item__content > button {
        width: 8vw;
      }
    }
  }
}
</style>