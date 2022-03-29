<template>
  <div>
    <p>旅行列表</p>
    <el-input
      v-model="state.search"
      style="width: 30%"
      placeholder="请输入关键字"
      clearable
    />
    <el-button type="primary" @click="getListData">按关键字搜索</el-button>
    <p></p>
    <el-table :data="state.tableData">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="dataName" label="名称" width="140">
      </el-table-column>
      <el-table-column
        prop="dataUrl"
        label="链接"
        width="140"
        slot-scope="scope"
      >
        <template #default="scope">
          <el-link
            type="primary"
            :href="scope.row.dataUrl"
            target="_blank"
            underline
            >前往观看</el-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="dataText" label="上榜理由"> </el-table-column>
      <el-table-column
        prop="likes"
        label="点赞数"
        width="140"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="
              changeLikes(
                1,
                scope.row.id,
                scope.row.dataType,
                scope.row.dataName,
                scope.row.dataUrl,
                scope.row.dataText,
                scope.row.likes
              )
            "
            >点赞</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="
              changeLikes(
                0,
                scope.row.id,
                scope.row.dataType,
                scope.row.dataName,
                scope.row.dataUrl,
                scope.row.dataText,
                scope.row.likes
              )
            "
            >点踩</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <p></p>
    <div class="demo-pagination-block">
      <el-pagination
        :currentPage="state.pageParams.pageNum"
        :page-size="state.pageParams.pageSize"
        :page-sizes="[5, 10, 20]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="state.pageParams.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onActivated, onMounted, reactive } from "vue";
import { getShare, putShare } from "../../api/skins";

interface IState {
  search: string;
  pageParams: {
    pageNum: number;
    pageSize: number;
    total: number;
  };
  tableData: {
    id: number; // 数据id
    dataType: string; // 数据类型
    dataName: string; // 数据名称
    dataUrl: string; // 数据网址
    dataText: string; // 数据上榜理由
    likes: number; // 点赞数
  }[];
}

const state: IState = reactive({
  search: "",
  pageParams: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
  tableData: [],
});

// 页面加载自动调用onMounted方法
onActivated(() => {
  getListData();
});

const changeLikes = (
  changeType: number,
  id_h: number,
  dataType_h: string,
  dataName_h: string,
  dataUrl_h: string,
  dataText_h: string,
  like_h: number
) => {
  if (changeType == 1) {
    putShare({
      id: id_h,
      dataType: dataType_h,
      dataName: dataName_h,
      dataUrl: dataUrl_h,
      dataText: dataText_h,
      likes: like_h + 1,
    });
  }

  if (changeType == 0) {
    putShare({
      id: id_h,
      dataType: dataType_h,
      dataName: dataName_h,
      dataUrl: dataUrl_h,
      dataText: dataText_h,
      likes: like_h - 1,
    });
  }

  getListData();
};

const getListData = async () => {
  try {
    const data = await getShare({
      pageNum: state.pageParams.pageNum,
      pageSize: state.pageParams.pageSize,
      type: "journey",
      search: state.search,
    });
    if (data) {
      // console.log(data.data.data);
      state.tableData = data.data.data.records;
      state.pageParams.total = data.data.data.total;
    }
  } catch (e) {
    console.log(e);
  }
};

const handleSizeChange = (val: number) => {
  // console.log(`${val} items per page`);
  state.pageParams.pageSize = val;
  getListData();
};

const handleCurrentChange = (val: number) => {
  // console.log(`current page: ${val}`);
  state.pageParams.pageNum = val;
  getListData();
};
</script>
