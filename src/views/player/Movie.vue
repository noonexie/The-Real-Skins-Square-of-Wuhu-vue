<template>
  <div style="width: 400px; margin: 10px auto">
    <div style="font-size: 50px; text-align: center">
      <h10>影视搜索</h10>
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.date" placeholder="剧集/电影/动漫/综艺..." />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            <el-link :href="form.cupfox + form.date" target="_blank"
              >看你想看
            </el-link>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { reactive } from "vue";

const form = reactive({
  date: "",
  cupfox: "https://cupfox.app/s/",
});
</script>
