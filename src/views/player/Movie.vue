<template>
  <div style="width: 400px; margin: 1vh auto">
    <div style="font-size: 50px; text-align: center">
      影视搜索
      <el-form :model="req">
        <el-form-item prop="data">
          <el-input v-model="req.date" placeholder="剧集/电影/动漫/综艺..." />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="searchForm()"
            >看你想看
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 200px">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="rspSubject.cover" class="image" />
        <div style="padding: 5px">
          <b>{{ rspSubject.title }}</b>
          <p>{{ rspSubject.info }}</p>
          豆瓣评分 : {{ rspSubject.rating }}
        </div>
      </el-card>
    </div>
  </div>
  <el-table :data="state.rspResources" stripe style="width: 100%">
    <el-table-column label="名称" slot-scope="scope">
      <template #default="scope">
        {{ scope.row.text.replaceAll("<em>","").replaceAll("</em>","") }}
      </template>
    </el-table-column>
    <el-table-column label="平台" >
      <template #default="scope">
        <el-image style="width: 15px; height: 15px" :src="scope.row.icon" />
        {{ scope.row.website }}
      </template>
    </el-table-column>
    <el-table-column prop="tags" label="标签"  />
    <el-table-column label="网址" slot-scope="scope">
      <template #default="scope">
        <el-link type="primary" :href="scope.row.url" target="_blank" underline>
          前往观看
        </el-link>
      </template>
    </el-table-column>
  </el-table>
  <!-- {{ state.rspResources }} -->
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { searchMovie } from "@/api/skins";
import CryptoJS from "crypto-js";

const req = reactive({
  date: "",
});

const rspSubject = reactive({
  comment: "",
  cover: "",
  info: "",
  rating: "",
  title: "暂无结果",
});

interface IState {
  rspResources: {
    icon: string;
    tags: [];
    text: string;
    type: number;
    url: string;
    website: string;
  }[];
}

const state: IState = reactive({
  rspResources: [],
});

const searchForm = async () => {
  state.rspResources = [];
  rspSubject.comment = "";
  rspSubject.cover = "";
  rspSubject.info = "";
  rspSubject.rating = "";
  rspSubject.title = "暂无结果";

  const data = await searchMovie({
    text: req.date,
    type: 0,
    from: 0,
    size: 20,
    douban_id: 0,
    token: CryptoJS.SHA1(req.date + "URBBRGROUN").toString(),
  });

  if (data.data.subject) {
    rspSubject.cover = data.data.subject.cover;
    rspSubject.title = data.data.subject.title;
    rspSubject.info = data.data.subject.info;
    rspSubject.rating = data.data.subject.rating;
    rspSubject.comment = data.data.subject.comment;
  }

  if (data.data.resources) {
    let start = 0;

    while (data.data.resources) {
      let length = data.data.resources.length;
      if (length === 0) break;

      start += length;

      for (let i = 0; i < length; i++) {
        const element = data.data.resources[i];
        state.rspResources.push(element);
      }

      const dataTemp = await searchMovie({
        text: req.date,
        type: 0,
        from: start,
        size: 20,
        douban_id: 0,
        token: CryptoJS.SHA1(req.date + "URBBRGROUN").toString(),
      });
      // console.log(dataTemp);
      data.data.resources = dataTemp.data.resources;
    }
  }
  // console.log(data.data.resources);
  // console.log(state.rspResources);
};
</script>

<style>
.image {
  width: 100%;
  display: block;
}
</style>
