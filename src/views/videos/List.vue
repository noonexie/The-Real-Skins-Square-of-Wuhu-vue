<template>
  <el-table :data="tableData">
    <el-table-column prop="name" label="名称" width="140"> </el-table-column>
    <el-table-column prop="url" label="链接" width="140">
      <el-link
        type="primary"
        href="http://www.sj021.com/bo/220802-2-1.html"
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
  name: "肖生克的救赎",
  url: "http://www.sj021.com/bo/220802-2-1.html",
  text: "当年的奥斯卡颁奖礼上，被如日中天的《阿甘正传》掩盖了它的光彩，而随着时间的推移，这部电影在越来越多的人们心中的地位已超越了《阿甘》。",
};
const tableData = ref(Array(20).fill(item));
</script>
