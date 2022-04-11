<template>
  <p></p>
  <el-form label-width="100px" :model="userData" style="max-width: 460px">
    <el-form-item label="用户名">
      <el-input v-model="userData.username" disabled />
    </el-form-item>
    <el-form-item label="用户昵称">
      <el-input v-model="userData.nickname" />
    </el-form-item>
    <el-form-item label="用户密码">
      <el-input v-model="userData.password" show-password />
    </el-form-item>

    <el-form-item label="用户头像">
      <el-upload
        class="avatar-uploader"
        action="/api/share/imgUpload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="userData.avatar" :src="userData.avatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm"> 修改 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { onActivated, reactive } from "vue";
import { ElMessage, FormInstance, UploadProps } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { getUserById } from "@/api/skins";

const userData = reactive({
  username: "",
  nickname: "",
  password: "",
  avatar: "",
});

onActivated(async () => {
  const userInfo = localStorage.getItem("user");
  if (userInfo) {
    let id = JSON.parse(userInfo).data;
    const res = await getUserById(id);
    // console.log(res.data.data.username);
    userData.username = res.data.data.username;
    userData.nickname = res.data.data.nickname;
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
});

// 上传成功的图片
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  userData.avatar = response.data;
  // console.log(arrayImg);
};

const submitForm = () => {};
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
