<template>
  <el-container
    class="layout-container-demo"
    style="height: 80%; border: 1px solid #eee"
  >
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><VideoCamera /></el-icon>电影
            </template>
            <el-menu-item index="1-1">推荐</el-menu-item>
            <el-menu-item index="1-2">排名</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Reading /></el-icon>书籍
            </template>
            <el-menu-item index="2-1">推荐</el-menu-item>
            <el-menu-item index="2-2">排名</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Headset /></el-icon>音乐
            </template>
            <el-menu-item index="3-1">推荐</el-menu-item>
            <el-menu-item index="3-2">排名</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><Monitor /></el-icon>游戏
            </template>
            <el-menu-item index="4-1">推荐</el-menu-item>
            <el-menu-item index="4-2">排名</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon><House /></el-icon>生活
            </template>
            <el-menu-item index="HelloWorld">推荐</el-menu-item>
            <el-menu-item index="5-2">排名</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="name" label="名称" width="140">
            </el-table-column>
            <el-table-column prop="url" label="链接" width="120">
            </el-table-column>
            <el-table-column prop="text" label="文字说明"> </el-table-column>
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import {
  VideoCamera,
  Headset,
  Reading,
  Setting,
  House,
  Monitor,
} from "@element-plus/icons-vue";

const item = {
  name: "肖生克的救赎",
  url: "http://www.sj021.com/bo/220802-2-1.html",
  text: "当年的奥斯卡颁奖礼上，被如日中天的《阿甘正传》掩盖了它的光彩，而随着时间的推移，这部电影在越来越多的人们心中的地位已超越了《阿甘》。",
};
const tableData = ref(Array(20).fill(item));
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  width: 240px;
  color: var(--el-text-color-primary);
  background: #fff !important;
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
</style>
