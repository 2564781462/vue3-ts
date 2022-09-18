<template>
  <div class="home-container">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <img src="../assets/vue.svg" alt="logo">
          </el-col>
          <el-col :span="16">
            <h2>后台管理系统</h2>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain @click="delToken">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              text-color="#fff"
              :default-active="active"
              router
          >
              <!--router开启路由模式，也就是可以通过index点击跳转对应path-->
            <el-menu-item v-for="item in list" :index="item.path" :key="item.meta.index">
              <span>{{item.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
  name:'home',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const list = router.getRoutes().filter(val => val.meta.isShow)
    //退出登录
    const delToken = () => {
      localStorage.removeItem("token");
      router.push('/login')
    }
    return {list,active:route.path,delToken}
  }
})

</script>

<style scoped lang="scss">
.el-header{
  height: 10vh;
  background-color: #091A32;
  .el-row{
    height: 10vh;
    line-height: 10vh;
    color: white;
  }
  .el-col{
    text-align: center;
  }
}
.el-menu{
  height: calc(100vh - 10vh);
}
</style>