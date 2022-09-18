<template>
  <div class="userList-container">
    <div class="search-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="selectData.nickName" placeholder="请输入姓名" @keydown.enter="searchnickName"/>
        </el-form-item>
        <el-select v-model="selectData.role" class="m-2">
          <el-option
              label="全部"
              :value="0"
          />
          <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
          />
        </el-select>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="data-show">
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="nickName" label="姓名" width="180" />
        <el-table-column prop="role.roleName" label="权限">
          <!-- 插槽-->
          <template #default="scope">
            <el-button
                v-for="item in scope.row.role"
                :key="item.role"
                link
                size="small"
            >
              {{item.roleName}}
            </el-button>
          </template>

        </el-table-column>

        <el-table-column prop="role.roleName" label="操作">
          <!-- 插槽-->
          <template #default="scope">
            <el-button
                link
                type="primary"
                size="small"
                @click="changeUser(scope.row)"
            >
              编辑
            </el-button>
          </template>

        </el-table-column>

      </el-table>
    </div>
    <div class="dialog">
      <el-dialog v-model="isShow" title="编辑信息">
        <el-form :model="active">
          <el-form-item label="姓名" label-width="50px">
            <el-input v-model="active.nickName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="角色" label-width="50px">
            <el-select multiple v-model="active.role" placeholder="请选择角色">
              <el-option
                  v-for="item in roleList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateUser">更改</el-button>
        <el-button type="primary" @click="cancel"
        >取消</el-button
        >
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs, watch} from 'vue'
import {getRole,getUserInfo} from "../request/api";
import {userInfo,listInt} from "../type/userList";

export default defineComponent({
  name:'userList',
  setup() {
    //reactive实例化一个对象
    const data = reactive(new userInfo())
    //生命周期函数
    onMounted(() => {
      getRoleData()
      getUserInfoData()
    })
    //获取角色信息（权限）
    const getRoleData = () => {
      getRole().then(res => {
        data.roleList = res
      })
    }
    //获取用户列表
    const getUserInfoData = () => {
      getUserInfo().then(res => {
        data.list = res
      })
    }
    //查询
    const onSubmit = () => {
      let arr:listInt[] = [];
      if (data.selectData.nickName || data.selectData.role){ //判断名字或者管理员搜索是否为空
        if (data.selectData.nickName){ //名字搜索不为空
          arr = data.list.filter((value => {
            return value.nickName.indexOf(data.selectData.nickName) !== -1
          }))
        }
        if (data.selectData.role){
          arr = (data.selectData.nickName ? arr: data.list).filter(value => {
            return value.role.find(item => item.role === data.selectData.role)
          })
        }
      }else {
        arr = data.list
      }
      data.list = arr
    }
    //监听两个搜索框
    watch([()=>data.selectData.role,()=>data.selectData.nickName],() => {
      if (data.selectData.nickName == '' || data.selectData.role == 0){
        getUserInfoData()
      }
    })
    //搜索框搜索姓名的键盘按下事件
    const searchnickName = () => {
      onSubmit()
    }
    //编辑
    const changeUser = (row:listInt) => {
      data.active = {
        id:row.id,
        nickName:row.nickName,
        uname:row.uname,
        role:row.role.map((value:any) => value.role || value.roleId)
      }
      data.isShow = true
    }
    //更改
    const updateUser = () => {
      let obj:any = data.list.find((value) => value.id == data.active.id)
      obj.nickName = data.active.nickName
      obj.role = data.roleList.filter((value) => data.active.role.indexOf(value.roleId) !== -1)
      data.list.forEach((item,index)=>{
        if (item.id == obj.id){
          data.list[index] = obj
        }
      })
      data.isShow = false;
    }
    //取消
    const cancel = () => {
      data.isShow = false
    }
    return {...toRefs(data),onSubmit,searchnickName,changeUser,updateUser,cancel}
  }
})

</script>

<style scoped lang="scss">
.el-form{
  display: flex;
}
.el-form-item{
  margin-left: 1vw;
}
</style>