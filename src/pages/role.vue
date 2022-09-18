<template>
  <div class="container">
    <div class="search-box">
      <el-button type="primary" @click="onSubmit">添加角色</el-button>
    </div>
    <div class="data-show">
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="roleId" label="ID" width="180"/>
        <el-table-column prop="roleName" label="角色名" width="180"/>
        <el-table-column prop="authority" label="操作">
          <!-- 插槽-->
          <template #default="scope">
            <el-button
                link
                type="primary"
                size="small"
                @click="changeUser(scope.row)"
            >
              修改权限
            </el-button>
          </template>

        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs} from 'vue'
import {getRole} from "../request/api";
import {roleData,roleInt} from "../type/role";
import {ElMessage, ElMessageBox} from 'element-plus'
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'role',
  setup() {
    //获取接口数据
    onMounted(() => {
      getRole().then(res => {
        data.list = res
      })
    })
    //实例数据类型
    const data = reactive(new roleData())
    const router = useRouter()

    //添加角色
    const onSubmit = () => {
      ElMessageBox.prompt('请输入角色名称', '添加角色', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      })
          .then(({value}) => {
            //判断是否为空
            if (value){
              data.list.push({
                roleId:data.list.length + 1,
                roleName:value,
                authority:[] //操作权限
              })
            }
            ElMessage({
              type: 'success',
              message: `${value}角色添加成功`,
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消修改',
            })
          })
    }

    //修改权限
    const changeUser = (row:roleInt) => {
      //跳转到权限列表
      router.push({
        path:'authority',
        query:{
          id:row.roleId,
          authority:row.authority.join(',')
        }
      })
    }
    return {...toRefs(data), changeUser, onSubmit}
  }
})

</script>

<style scoped lang="scss">
.search-box {
  margin-bottom: 2vh;
}
</style>