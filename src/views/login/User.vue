<template>
  <p></p>
  <el-form label-width="100px" :model="userData" style="max-width: 460px">
    <el-form-item label="用户账号">
      <el-input v-model="userData.username" disabled />
    </el-form-item>
    <el-form-item label="用户昵称">
      <el-input v-model="userData.nickname" />
    </el-form-item>
    <el-form-item label="用户邮箱">
      <el-input v-model="userData.email" />
    </el-form-item>
    <el-form-item label="用户密码">
      <el-input v-model="userData.password" show-password />
    </el-form-item>

    <!-- <el-form-item label="用户头像">
      <el-upload
        class="avatar-uploader"
        action="/api/share/imgUpload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        disabled
      >
        <img v-if="userData.avatar" :src="userData.avatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item> -->

    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="primary" @click="register">注册</el-button>
      <el-popconfirm
        confirm-button-text="确定"
        cancel-button-text="取消"
        title="确认修改用户信息吗？"
        @confirm="submitForm"
      >
        <!-- ts无法使用this.$refs.ref,ref操作可以通过方法传到bom层 -->
        <template #reference>
          <el-button type="primary">修改</el-button>
        </template>
      </el-popconfirm>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { onActivated, reactive, ref } from "vue";
import { ElMessage, FormInstance, UploadProps } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { getUserById, putUserInfo } from "@/api/skins";
import VueRouter from "@/main";
// import { getUserById, putUserInfo } from "@/api/skins";

const userData = reactive({
  id: 0,
  username: "",
  nickname: "",
  email: "",
  password: "",
  avatar: "",
});

onActivated(() => {
  getUserInfo();
});

const getUserName = async () => {
  const userInfo = localStorage.getItem("user");
  if (userInfo) {
    userData.nickname = JSON.parse(userInfo).name;
  } else {
    ElMessage({
      message: "用户未登录,登录只需输入昵称",
      type: "error",
    });
  }
};

const getUserInfo = async () => {
  const userInfo = localStorage.getItem("user");
  if (userInfo) {
    userData.id = JSON.parse(userInfo).data;
    const res = await getUserById(userData.id);
    // console.log(res.data.data.username);
    userData.username = res.data.data.username;
    userData.nickname = res.data.data.nickname;
    userData.email = res.data.data.email;
    userData.password = res.data.data.password;
    userData.avatar =
      res.data.data.avatar == null
        ? "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        : res.data.data.avatar;
  } else {
    ElMessage({
      message: "用户未登录",
      type: "error",
    });
  }
};

// 上传成功的图片
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  userData.avatar = response.data;
  // console.log(arrayImg);
};

const loginForm = () => {
  localStorage.setItem("user", JSON.stringify({ name: userData.nickname }));
  // console.log(res);
  ElMessage({
    message: "登录成功，可以前往聊天室",
    type: "success",
  });
};

// 前往注册
const register = () => {
  VueRouter.push("/register");
};

// 前往注册
const login = () => {
  VueRouter.push("/login");
};

const submitForm = async () => {
  const res = await putUserInfo(userData);
  // console.log(res);
  if (res.data.code == 0) {
    ElMessage({
      message: "修改成功",
      type: "success",
    });
  }
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
