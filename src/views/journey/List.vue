<template>
  <div>
    <el-input v-model="input" style="width: 30%" placeholder="请输入名称" />
    <el-button type="primary">按名称搜索</el-button>
  </div>
  <el-table :data="tableData">
    <el-table-column prop="name" label="旅游名称" width="140"> </el-table-column>
    <el-table-column prop="url" label="链接" width="140">
      <el-link
        type="primary"
        href="http://www.mafengwo.cn/mdd/route/12938_138571.html"
        target="_blank"
        underline
        >前往观看</el-link
      >
    </el-table-column>
    <el-table-column prop="text" label="上榜理由"> </el-table-column>
    <el-table-column prop="count" label="点赞数" width="140"></el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from "vue";

const input = ref("");
const item = {
  name: "海南逐浪度假线",
  url: "http://www.mafengwo.cn/mdd/route/12938_138571.html",
  text: "异地还车需支付一笔异地还车费，海南自驾全程没有高速费，但油费会相对贵一些。",
  count: 1,
};
const tableData = ref(Array(20).fill(item));
</script>
