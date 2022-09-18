<template>
  <div class="container">
    <h2>权限列表</h2>
    <h3>传递过来的值：id:{{id}} , 可执行的权限：{{authority ? authority : "没有权限"}}</h3>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import {useRoute} from "vue-router";
import {intData} from "../type/authority";

export default defineComponent({
  name:'authority',
  setup() {
    const route = useRoute()
    const params:any = route.query
    const data =reactive(new intData(params.id,params.authority))
    return {...toRefs(data)}
  }
})

</script>

<style scoped lang="scss">

</style>