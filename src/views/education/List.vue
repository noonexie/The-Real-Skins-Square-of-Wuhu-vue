<template>
  <div>
    <el-input v-model="input" style="width: 30%" placeholder="请输入名称" />
    <el-button type="primary">按名称搜索</el-button>
  </div>
  <p></p>
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
    <el-table-column prop="count" label="点赞数" width="140"></el-table-column>
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button type="text" size="small" @click="handleClick"
          >点赞</el-button
        >
        <el-button type="text" size="small">点踩</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from "vue";

const input = ref("");

const handleClick = () => {
  console.log('click')
}

const item = {
  name: "中考前必看的9个应试小技巧！",
  url: "https://baijiahao.baidu.com/s?id=1702320924223279690&wfr=spider&for=pc",
  text: "不看后悔！",
  count: 1,
};

const tableData = ref(Array(20).fill(item));
</script>
