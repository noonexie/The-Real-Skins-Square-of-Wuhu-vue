<template>
  <el-row class="tac">
    <el-col :span="6">
      <h5 class="mb-2">Valar Morghulis</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>电影</span>
          </template>
            <el-menu-item index="1-2">电影推荐</el-menu-item>
            <el-menu-item index="1-1">电影排名</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>书籍</span>
          </template>
            <el-menu-item index="2-2">书籍推荐</el-menu-item>
            <el-menu-item index="2-1">书籍排名</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><location /></el-icon>
            <span>音乐</span>
          </template>
            <el-menu-item index="3-1">音乐推荐</el-menu-item>
            <el-menu-item index="3-2">音乐排名</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><location /></el-icon>
            <span>游戏</span>
          </template>
            <el-menu-item index="4-1">游戏推荐</el-menu-item>
            <el-menu-item index="4-2">游戏排名</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon><location /></el-icon>
            <span>生活</span>
          </template>
            <el-menu-item index="5-1">生活推荐</el-menu-item>
            <el-menu-item index="5-2">生活排名</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

