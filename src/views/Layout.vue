<template>
  <!-- <el-aside style="width: 15%; background-color: rgb(238, 241, 246)"> -->
  <!-- <el-scrollbar> -->
  <!--添加:default-active="$route.path"实现事件触发跳转侧边栏选中状态也改变  -->
  <!-- </el-scrollbar> -->
  <!-- </el-aside> -->
  <!-- <el-header> -->
  <el-row>
    <el-col :span="21"> <b>芜湖真皮广场</b> </el-col>
    <el-col :span="3">
      <div class="toolbar">
        <el-avatar shape="square" :size="50" :src="avatarSrc" />
        <el-dropdown @command="handleCommand">
          {{ username }}
          <el-icon>
            <ArrowDownBold />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-link
                  type="primary"
                  href="https://github.com/noonexie"
                  target="_blank"
                  underline
                  >仓库地址
                </el-link>
              </el-dropdown-item>

              <el-dropdown-item command="a" style="color: cadetblue">
                好活当赏
              </el-dropdown-item>
              <el-dropdown-item command="b"> 个人信息 </el-dropdown-item>
              <el-dropdown-item command="c"> 退出登录 </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
  <!-- </el-header> -->

  <el-divider border-style="dashed" style="margin: 5px" />

  <!-- <el-header> -->
  <el-menu
    mode="horizontal"
    :default-active="$route.path"
    active-text-color="blue"
    background-color="skyblue"
    router
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Guide /></el-icon>广场中心
      </template>
      <el-menu-item index="/share/list">琳琅满目</el-menu-item>
      <el-menu-item index="/share/put">推荐共享</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/player/movie">
      <template #title>
        <el-icon><Film /></el-icon>影视厅
      </template>
    </el-menu-item>
    <el-menu-item index="/player/music">
      <template #title>
        <el-icon><Headset /></el-icon>音乐馆
      </template>
    </el-menu-item>
    <el-menu-item index="/player/LSchedule">
      <template #title>
        <el-icon><Headset /></el-icon>日程表
      </template>
    </el-menu-item>
    <el-menu-item index="/player/chat">
      <template #title>
        <el-icon><ChatDotRound /></el-icon>聊天室
      </template>
    </el-menu-item>
  </el-menu>
  <!-- </el-header> -->

  <el-main>
    <el-scrollbar>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts" setup>
import { getUserById } from "@/api/skins";
import { ElMessage } from "element-plus";
import VueRouter from "@/main";
import {
  ArrowDownBold,
  Film,
  Headset,
  ChatDotRound,
} from "@element-plus/icons-vue";
import { onActivated, ref } from "vue";

const avatarSrc = ref(
  "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
);
const username = ref("设置");

onActivated(() => {
  // getAvatar();
});

const getAvatar = async () => {
  const userInfo = localStorage.getItem("user");
  if (userInfo) {
    const id = JSON.parse(userInfo).data;
    const res = await getUserById(id);
    // console.log(res.data.data.username);
    username.value = res.data.data.nickname;
    avatarSrc.value =
      res.data.data.avatar == null
        ? "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        : res.data.data.avatar;
  }
};

const handleCommand = (command: string | number | object) => {
  if (command == "a") {
    VueRouter.push("/home");
  }

  if (command == "b") {
    VueRouter.push("/user");
  }

  if (command == "c") {
    localStorage.removeItem("user");
    ElMessage({
      message: "用户已退出",
      type: "error",
    });
    VueRouter.push("/home");
  }
};
</script>

<style scoped>
.toolbar {
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
