<template>
  <el-table :data="tableData">
    <el-table-column prop="name" label="名称" width="140"> </el-table-column>
    <el-table-column prop="url" label="链接" width="140">
      <el-link
        type="primary"
        href="https://read.qidian.com/chapter/SaJ9L6aSg4E1/RVkDZcwLjh4ex0RJOkJclQ2/"
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
  name: "遮天",
  url: "https://read.qidian.com/chapter/SaJ9L6aSg4E1/RVkDZcwLjh4ex0RJOkJclQ2/",
  text: "修仙觅长生，热血任逍遥，踏莲曳波涤剑骨，凭虚御风塑圣魂！",
};
const tableData = ref(Array(20).fill(item));
</script>
