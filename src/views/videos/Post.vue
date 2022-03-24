<template>
  <div>
    <p>电影推荐</p>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-form-item label="电影名称" prop="data_name">
        <el-input v-model="ruleForm.data_name" style="width: 30%" />
      </el-form-item>
      <el-form-item label="网址" prop="data_url">
        <el-input v-model="ruleForm.data_url" style="width: 50%" />
      </el-form-item>
      <el-form-item label="上榜理由" prop="data_text">
        <el-input v-model="ruleForm.data_text" data_type="data_textarea" />
      </el-form-item>
      <el-form-item>
        <el-button data_type="primary" @click="submitForm(ruleFormRef)"
          >提交</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import http from "../../utils/http";

const formSize = ref("default");

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  id: 0,
  data_type: "video",
  data_name: "",
  data_url: "",
  data_text: "",
  likes: 0,
});

const rules = reactive({
  data_name: [
    { required: true, message: "请输入您推荐的电影名称", trigger: "blur" },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  data_url: [
    { required: true, message: "请输入您推荐电影的网址", trigger: "blur" },
  ],
  data_text: [
    { required: true, message: "请输入您推荐电影的上榜理由", trigger: "blur" },
  ],
});

const postVideoShare = (data: {
  id: number;
  data_type: string;
  data_name: string;
  data_url: string;
  data_text: string;
  likes: number;
}) => {
  return http({
    method: "post",
    url: "/api/share",
    data,
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      postVideoShare(ruleForm);
      alert("提交成功");
      formEl.resetFields();
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>
