<template>
  <div
    style="
      width: 100%;
      height: 100vh;
      background-color: lightskyblue;
      overflow: hidden;
      /* 去掉上层空白 */
    "
  >
    <div style="width: 400px; margin: 150px auto">
      <div style="color: white; font-size: 30px; text-align: center">
        欢迎登陆
        <p>芜湖真皮广场</p>
        <el-form :model="formLabelAlign">
          <el-form-item>
            <el-input
              placeholder="请输入用户名"
              :prefix-icon="User"
              v-model="formLabelAlign.name"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="请输入密码"
              :prefix-icon="Lock"
              v-model="formLabelAlign.password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Lock, User } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formLabelAlign = reactive({
  name: "",
  password: "",
});

const login = () => {
  //登录成功后跳转到主页
  router.push("/");
};
</script>
