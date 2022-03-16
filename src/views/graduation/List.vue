<template>
  <el-table :data="tableData">
    <el-table-column prop="name" label="名称" width="140"> </el-table-column>
    <el-table-column prop="url" label="链接" width="140">
      <el-link
        type="primary"
        href="https://jingyan.baidu.com/article/ca41422f31fd541eae99ed31.html"
        target="_blank"
        underline
        >前往观看</el-link
      >
    </el-table-column>
    <el-table-column prop="text" label="上榜理由"> </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from "vue";
const item = {
  name: "应届生毕业须知",
  url: "https://jingyan.baidu.com/article/ca41422f31fd541eae99ed31.html",
  text: "转眼间、就到了毕业的时间、在这里我想把我自己到公司做销售的一些经验分享给大家！希望能帮到你们！",
};
const tableData = ref(Array(20).fill(item));
</script>
