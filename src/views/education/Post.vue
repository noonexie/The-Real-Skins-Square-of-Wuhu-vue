<template>
  <p>教育推荐</p>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
  >
    <el-form-item label="应试名称" prop="name">
      <el-input v-model="ruleForm.name" style="width: 30%" />
    </el-form-item>
    <el-form-item label="网址" prop="url">
      <el-input v-model="ruleForm.url" style="width: 50%" />
    </el-form-item>
    <el-form-item label="上榜理由" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >提交</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  url: "",
  desc: "",
});

const rules = reactive({
  name: [
    { required: true, message: "请输入您推荐的应试名称", trigger: "blur" },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  url: [{ required: true, message: "请输入您推荐应试的网址", trigger: "blur" }],
  desc: [
    { required: true, message: "请输入您推荐应试的上榜理由", trigger: "blur" },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
