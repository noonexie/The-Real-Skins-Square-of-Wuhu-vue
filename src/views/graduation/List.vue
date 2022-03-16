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
        href="https://jingyan.baidu.com/article/ca41422f31fd541eae99ed31.html"
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
  name: "应届生毕业须知",
  url: "https://jingyan.baidu.com/article/ca41422f31fd541eae99ed31.html",
  text: "转眼间、就到了毕业的时间、在这里我想把我自己到公司做销售的一些经验分享给大家！希望能帮到你们！",
  count: 1,
};

const tableData = ref(Array(20).fill(item));
</script>
