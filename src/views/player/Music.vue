<template>
  <div style="width: 400px; margin: 1vh auto">
    <div style="font-size: 50px; text-align: center">
      音乐搜索
      <el-form :model="req">
        <el-form-item prop="data">
          <el-input v-model="req.date" placeholder="搜索音乐/歌手" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="searchForm()"
            >听你想看
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <el-table :data="state.rspResources" stripe style="width: 100%">
    <el-table-column label="歌曲名" slot-scope="scope">
      <template #default="scope">
        {{ scope.row.FileName }}
      </template>
    </el-table-column>
    <el-table-column label="专辑" width="300">
      <template #default="scope">
        {{ scope.row.AlbumName }}
      </template>
    </el-table-column>
    <el-table-column label="获取资源" width="100" slot-scope="scope">
      <template #default="scope">
        <el-button
          type="primary"
          @click="
            getMusicUrl(scope.$index, scope.row.FileHash, scope.row.AlbumID)
          "
        >
          获取
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="播放" width="350" slot-scope="scope">
      <template #default="scope">
        <audio :src="scope.row.PlayUrl" controls loop></audio>
      </template>
    </el-table-column>
  </el-table>
  <!-- {{ state.rspResources }} -->
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { searchMusic, getMp3Url } from "@/api/skins";
import { ElMessage } from "element-plus";
// import CryptoJS from "crypto-js";

const req = reactive({
  date: "",
});

interface IState {
  rspResources: {
    FileName: "";
    AlbumName: "";
    FileHash: "";
    AlbumID: "";
    PlayUrl: "";
  }[];
  total: number;
}

const state: IState = reactive({
  rspResources: [],
  total: 0,
});

const searchForm = async () => {
  state.rspResources = [];
  const data = await searchMusic({
    keyword: req.date,
    page: 1,
  });
  state.rspResources = data.data.data.lists;

  if (data.data.data) {
    state.total = data.data.data.total;
    if (state.total > 20) {
      for (let i = 2; i <= Math.ceil(state.total / 20); i++) {
        const dataTemp = await searchMusic({
          keyword: req.date,
          page: i,
        });
        state.rspResources = state.rspResources.concat(
          dataTemp.data.data.lists
        );
      }
    }
  }
};

const getMusicUrl = async (index: number, hash: string, album_id: number) => {
  const data = await getMp3Url({
    r: "play/getdata",
    callback: "jQuery",
    mid: 1,
    hash: hash,
    platid: 4,
    album_id: album_id,
  });

  if (data.data) {
    state.rspResources[index].PlayUrl = JSON.parse(
      data.data.substring(7, data.data.length - 2)
    ).data.play_url;
  }

  if (
    state.rspResources[index].PlayUrl === "" ||
    state.rspResources[index].PlayUrl == undefined
  ) {
    ElMessage({
      message: "获取失败，请换一首歌",
      type: "error",
    });
  } else {
    ElMessage({
      message: "获取成功，请点击右侧播放",
      type: "success",
    });
  }
};
</script>
