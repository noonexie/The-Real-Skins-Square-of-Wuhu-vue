<template>
  <div>
    <p>影视推荐</p>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-form-item label="电影名称" prop="dataName">
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

      <el-form-item label="图片上传" prop="dataImage">
        <el-upload
          multiple
          action="/api/share/imgUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          ref="uploadRef"
        >
          <!-- :on-xxxx="handle"：钩子，事件触发时就会被调用 -->
          <!-- 图片在选中上传并展现在页面时就已经上传到后台了，删除是不过是删除前端记录 -->
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
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
            <el-button type="primary">提交</el-button></template
          ></el-popconfirm
        >
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          title="确认重置吗？"
          @confirm="resetForm(ruleFormRef, uploadRef)"
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
import { postShare } from "@/api/skins";
import { useRouter } from "vue-router";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";

const formSize = ref("default");
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const ruleFormRef = ref<FormInstance>();
const uploadRef = ref<any>();
const arrayImg: string[] = [];

// 定义数据对象
const ruleForm = reactive({
  id: 0,
  dataType: "video",
  dataName: "",
  dataUrl: "",
  dataText: "",
  imgUrl: "",
  likes: 0,
});

// 表单规则限制
const rules = reactive({
  dataName: [
    { required: true, message: "请输入您推荐的电影名称", trigger: "blur" },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  dataUrl: [
    { required: true, message: "请输入您推荐电影的网址", trigger: "blur" },
  ],
  dataText: [
    { required: true, message: "请输入您推荐电影的上榜理由", trigger: "blur" },
  ],
});

// 表单重置
const resetForm = (
  formEl: FormInstance | undefined,
  uploadEL: any | undefined
) => {
  if (!formEl) return;
  formEl.resetFields();
  uploadEL.clearFiles();
};

const router = useRouter();

// 路由跳转
const routerUrl = () => {
  router.push("/videos/list");
};

// 清除上传图片的URL
const handleRemove: UploadProps["onRemove"] = (uploadFile: any) => {
  let index = arrayImg.indexOf(uploadFile.response.data);
  if (index > -1) {
    // 使用splice函数进行删除（splice函数会操作原数组）
    arrayImg.splice(index, 1);
  }
  // console.log(arrayImg);
};

// 预览上传的图片
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  // console.log(dialogImageUrl.value);
  dialogVisible.value = true;
};

// 上传成功的图片
const handleSuccess: UploadProps["onSuccess"] = (response) => {
  arrayImg.push(response.data);
  // console.log(arrayImg);
};

// 表单提交
const submitForm = async (
  formEl: FormInstance | undefined,
  uploadEL: any | undefined
) => {
  if (!formEl) return;
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      for (let index = 0; index < arrayImg.length; index++) {
        const element = arrayImg[index];
        ruleForm.imgUrl += element + ",";
      }
      ruleForm.imgUrl =
        ruleForm.imgUrl.substring(ruleForm.imgUrl.length - 1) == ","
          ? ruleForm.imgUrl.substring(0, ruleForm.imgUrl.length - 1)
          : ruleForm.imgUrl;

      // console.log(ruleForm.imgUrl);
      postShare(ruleForm);
      ElMessage({
        message: "提交成功",
        type: "success",
      });
      formEl.resetFields();
      uploadEL.clearFiles();
      routerUrl();
    } else {
      // console.log("error submit!", fields);
    }
  });
};
</script>
