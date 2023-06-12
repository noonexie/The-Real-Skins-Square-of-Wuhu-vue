<template>
  <div>
    <p>添加日程</p>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      :size="formSize"
    >
      <el-form-item label="开始时间" prop="start">
        <el-date-picker v-model="ruleForm.start" type="datetime" />
      </el-form-item>
      <el-form-item label="结束时间" prop="end">
        <el-date-picker v-model="ruleForm.end" type="datetime" />
      </el-form-item>
      <el-form-item label="可玩事项" prop="things">
        <el-input
          v-model="ruleForm.things"
          type="textarea"
          style="width: 80%"
          :autosize="{ minRows: 2, maxRows: 4 }"
        />
      </el-form-item>
      <el-form-item>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          title="确认提交吗？"
          @confirm="submitForm(ruleFormRef, uploadRef)"
        >
          <!-- ts无法使用this.$refs.ref,ref操作可以通过方法传到bom层 -->
          <template #reference>
            <el-button type="primary">提交</el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary" @click="routerLS">查看日程</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { postShare } from "../../api/skins";
import VueRouter from "../../main";

const timeRange = ref<[Date, Date]>([new Date(), new Date()]);

const formSize = ref("default");
const dataText = ref("");
const ruleFormRef = ref<FormInstance>();
const uploadRef = ref<any>();

// 定义数据对象
const ruleForm = reactive({
  id: 0,
  user: 0,
  start: new Date(),
  end: new Date(),
  things: "",
});

// 表单规则限制
const rules = reactive({
  start: [{ required: true, message: "请选择日程开始时间", trigger: "blur" }],
  end: [
    { required: true, message: "请选择日程结束时间", trigger: "blur" },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  things: [{ required: true, message: "请输入您的可玩事项", trigger: "blur" }],
});

// 路由跳转
const routerLS = () => {
  VueRouter.push("/player/LSchedule");
};

// 表单提交
const submitForm = async (
  formEl: FormInstance | undefined,
  uploadEL: any | undefined
) => {
  if (!formEl) return;
  await formEl.validate(async (valid: any, fields: any) => {
    if (valid) {
      const userInfo = localStorage.getItem("user");
      if (userInfo) {
        ruleForm.user = JSON.parse(userInfo).data;
        if (ruleForm.user) {
          // 校验start<end
          if (ruleForm.start >= ruleForm.end) {
            ElMessage({
              message: "结束时间应大于开始时间",
              type: "error",
            });
            return;
          }
          // 未作提交失败处理
          const res = await postShare(ruleForm);
          if (res.data.code == 0) {
            ElMessage({
              message: "提交成功",
              type: "success",
            });
          }
          routerLS();
        }
      } else {
        ElMessage({
          message: "提交失败：未登录",
          type: "error",
        });
      }
    } else {
      // console.log("error submit!", fields);
    }
  });
};
</script>
