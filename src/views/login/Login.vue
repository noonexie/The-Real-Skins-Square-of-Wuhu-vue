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
        <el-form :model="userForm" :rules="rules" ref="ruleFormRef">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名，英文或数字"
              :prefix-icon="User"
              v-model="userForm.username"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              :prefix-icon="Lock"
              v-model="userForm.password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%"
              type="primary"
              @click="login(ruleFormRef)"
              >登录</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="register"
              >前往注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Lock, User } from "@element-plus/icons-vue";
import { ElMessage, FormInstance } from "element-plus";
import { postLogin } from "@/api/skins";
import VueRouter from "@/main";

const ruleFormRef = ref<FormInstance>();
const userForm = reactive({
  username: "",
  password: "",
});
const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

// 验证登录
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid: any) => {
    if (valid) {
      const res = await postLogin(userForm);
      // console.log(res.data);
      if (res.data.code == -1) {
        ElMessage({
          message: res.data.msg,
          type: "error",
        });
      } else {
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        formEl.resetFields();

        localStorage.setItem("user", JSON.stringify(res.data)); // 缓存用户信息

        //登录成功后跳转到主页
        VueRouter.push("/");
      }
    } else {
      // console.log("error submit!");
    }
  });
};

// 前往注册
const register = () => {
  VueRouter.push("/register");
};
</script>
