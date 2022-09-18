<template>
  <div class="goods-container">
    <div class="search-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="selectData.title" placeholder="请输入关键字" @keydown.enter="searchTitle"/>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.desc" placeholder="请输入关键字" @keydown.enter="searchDesc" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="data-show">
      <el-table :data="dataList.comList" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="title" label="名称" width="180" />
        <el-table-column prop="desc" label="介绍" />
      </el-table>
    </div>
    <div class="page-box">
      <!--分页-->
      <el-pagination background layout="prev, pager, next"
                     :page-size="selectData.pagesize"
                     :total="selectData.count"
                     @size-change="sizeChange"
                     @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, toRefs, watch} from 'vue'
import {getGoods} from "../request/api";
import {intData,listInt} from "../type/goods";

export default defineComponent({
  setup() {
    const data = reactive(new intData())
    //声明周期获取数据
    onMounted(() => {
      getGoodsData()
    })
    const getGoodsData = () => {
      getGoods().then(res=>{
        data.list = res
        data.selectData.count = res.length
      })
    }
    //分页
    const dataList = reactive({
      comList:computed(()=>{
        return data.list.slice( //切割:包头不包尾
            (data.selectData.page - 1) * data.selectData.pagesize,
            data.selectData.page * data.selectData.pagesize
        )
      })
    })
    const sizeChange = (pagesize:number) =>{
      data.selectData.pagesize = pagesize
    }
    const currentChange = (page:number) =>{
      data.selectData.page = page
    }
    //搜索查询
    const onSubmit = () => {
      let arr:listInt[] = [];
      if (data.selectData.title || data.selectData.desc){ //判断标题或者详情搜索是否为空
        if (data.selectData.title){
          arr = data.list.filter((value => {
            return value.title.indexOf(data.selectData.title) !== -1
          }))
        }
        if (data.selectData.desc){
          arr = data.list.filter(value => {
            return value.desc.indexOf(data.selectData.desc) !== -1
          })
        }
      }else {
        arr = data.list
      }
      data.selectData.count = arr.length
      data.list = arr
    }
    //监听输入框的两个属性
    watch([()=>data.selectData.title,()=>data.selectData.desc],() => {
      if (data.selectData.title == '' && data.selectData.desc == ''){
        getGoodsData()
      }
    })
    //输入框enter键盘按下事件
    const searchTitle = () => {
      onSubmit()
    }
    const searchDesc = () => {
      onSubmit()
    }
    return {...toRefs(data),sizeChange,currentChange,dataList,onSubmit,searchTitle,searchDesc}
  }
})

</script>

<style scoped lang="scss">
.goods-container{
  height: 80vh;
  position: relative;
  .page-box{
    position: absolute;
    bottom: 0;
  }
}
</style>