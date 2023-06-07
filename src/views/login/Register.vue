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
        欢迎注册
        <p>芜湖真皮广场</p>
        <el-form :model="userForm" :rules="rules" ref="ruleFormRef">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入账号"
              :prefix-icon="User"
              v-model="userForm.username"
              password
            />
          </el-form-item>
          <el-form-item prop="nickname">
            <el-input
              placeholder="请输入昵称"
              :prefix-icon="Avatar"
              v-model="userForm.nickname"
            />
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              placeholder="请输入邮箱"
              :prefix-icon="Message"
              v-model="userForm.email"
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
          <el-form-item prop="confirm">
            <el-input
              placeholder="请确认密码"
              :prefix-icon="Lock"
              v-model="userForm.confirm"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%"
              type="primary"
              @click="register(ruleFormRef)"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Lock, User, Avatar, Message } from "@element-plus/icons-vue";
import { ElMessage, FormInstance } from "element-plus";
import { postRegister } from "@/api/skins";
import VueRouter from "@/main";

const ruleFormRef = ref<FormInstance>();
const userForm = reactive({
  username: "",
  nickname: "",
  email: "",
  password: "",
  confirm: "",
});
const rules = reactive({
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirm: [{ required: true, message: "请确认密码", trigger: "blur" }],
});

// 注册验证
const register = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid: any) => {
    if (valid) {
      // 判断账号不支持中文
      for (let i = 0; i < userForm.username.length; i++) {
        if (
          userForm.username.charCodeAt(i) < 0 ||
          userForm.username.charCodeAt(i) >= 255
        ) {
          ElMessage({
            message: "账号不支持中文",
            type: "error",
          });
          return;
        }
      }

      // 判断二次输入密码匹配
      if (userForm.password != userForm.confirm) {
        ElMessage({
          message: "二次输入密码不匹配",
          type: "error",
        });
        return;
      }

      const res = await postRegister(userForm);
      // console.log(res.data);
      if (res.data.code == -1) {
        ElMessage({
          message: res.data.msg,
          type: "error",
        });
      } else {
        ElMessage({
          message: "注册成功，请登录",
          type: "success",
        });
        formEl.resetFields();
        //登录成功后跳转到登录页面
        VueRouter.push("/login");
      }
    } else {
      // console.log("error submit!");
    }
  });
};
</script>
