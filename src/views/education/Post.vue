<template>
  <div>
    <p>教育推荐</p>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-form-item label="教育名称" prop="dataName">
        <el-input v-model="ruleForm.dataName" style="width: 30%" clearable />
      </el-form-item>
      <el-form-item label="网址" prop="dataUrl">
        <el-input v-model="ruleForm.dataUrl" style="width: 50%" clearable />
      </el-form-item>
      <el-form-item label="上榜理由" prop="dataText">
        <el-input
          v-model="ruleForm.dataText"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
        />
      </el-form-item>
      <el-form-item>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          title="确认提交吗？"
          @confirm="submitForm(ruleFormRef)"
        >
          <template #reference>
            <el-button type="primary">提交</el-button></template
          ></el-popconfirm
        >
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          title="确认重置吗？"
          @confirm="resetForm(ruleFormRef)"
        >
          <template #reference>
            <el-button>重置</el-button>
          </template></el-popconfirm
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { postShare } from "../../api/skins";

const formSize = ref("default");

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  id: 0,
  dataType: "education",
  dataName: "",
  dataUrl: "",
  dataText: "",
  likes: 0,
});

const rules = reactive({
  dataName: [
    { required: true, message: "请输入您推荐的教育名称", trigger: "blur" },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  dataUrl: [
    { required: true, message: "请输入您推荐教育的网址", trigger: "blur" },
  ],
  dataText: [
    { required: true, message: "请输入您推荐教育的上榜理由", trigger: "blur" },
  ],
});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      postShare(ruleForm);
      ElMessage({
        message: "提交成功",
        type: "success",
      });
      formEl.resetFields();
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>
