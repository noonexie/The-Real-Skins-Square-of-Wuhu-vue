<template>
  <el-table :data="tableData">
    <el-table-column prop="name" label="名称" width="140"> </el-table-column>
    <el-table-column prop="url" label="链接" width="140">
      <el-link
        type="primary"
        href="https://baijiahao.baidu.com/s?id=1702320924223279690&wfr=spider&for=pc"
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
  name: "中考前必看的9个应试小技巧！",
  url: "https://baijiahao.baidu.com/s?id=1702320924223279690&wfr=spider&for=pc",
  text: "不看后悔！",
};
const tableData = ref(Array(20).fill(item));
</script>
