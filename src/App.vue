<template>
  <el-container
    class="layout-container-demo"
    style="height: 900px; border: 1px solid #eee"
  >
    <el-aside style="width: 15%; background-color: rgb(238, 241, 246)">
      <el-scrollbar>
        <!--添加:default-active="$route.path"实现事件触发跳转侧边栏选中状态也改变  -->
        <el-menu
          :default-active="$route.path"
          active-text-color="#8cc5ff"
          :default-openeds="['1', '2', '3', '4', '5']"
          router
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Reading /></el-icon>应试教育
            </template>
            <el-menu-item index="/education/list">排名</el-menu-item>
            <el-menu-item index="/education/put">推荐</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Guide /></el-icon>毕业找我
            </template>
            <el-menu-item index="/graduation/list">排名</el-menu-item>
            <el-menu-item index="/graduation/put">推荐</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Collection /></el-icon>书友计划
            </template>
            <el-menu-item index="/books/list">排名</el-menu-item>
            <el-menu-item index="/books/put">推荐</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><VideoCamera /></el-icon>影视经典
            </template>
            <el-menu-item index="/videos/list">排名</el-menu-item>
            <el-menu-item index="/videos/put">推荐</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon><Bicycle /></el-icon>驴友之家
            </template>
            <el-menu-item index="/journey/list">排名</el-menu-item>
            <el-menu-item index="/journey/put">推荐</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header>
        <div>
          <span>
            <img
              src="./image/1646722035560-image.png"
              width="100"
              height="50"
              style="margin-left: 10%; margin-top: 0.3%"
            />
          </span>
          <span style="margin-left: 10%; font-style: italic; font-size: 40px">
            芜湖真皮广场
          </span>
          <span>
            <img
              src="./image/1646723521163-image.png"
              width="100"
              height="50"
              style="margin-left: 10%; margin-top: 0.3%"
            />
          </span>
        </div>
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  ><el-link
                    type="primary"
                    href="https://github.com/noonexie/The-Real-Skins-Square-of-Wuhu-vue"
                    target="_blank"
                    underline
                    >仓库地址</el-link
                  ></el-dropdown-item
                >
                <el-dropdown-item
                  ><router-link to="/">好活当赏</router-link></el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span><router-link to="/">主页</router-link></span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {
  VideoCamera,
  Collection,
  Reading,
  Setting,
  Guide,
  Bicycle,
} from "@element-plus/icons-vue";
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: #f2f6fc;
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
  text-align: right;
  font-size: 12px;
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
</style>
