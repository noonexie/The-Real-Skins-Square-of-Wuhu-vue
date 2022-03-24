<template>
  <div>
    <p>电影列表</p>
    <el-input v-model="input" style="width: 30%" placeholder="请输入关键字" />
    <el-button type="primary">按关键字搜索</el-button>
    <p></p>
    <el-table :data="state.tableData">
      <el-table-column prop="data_name" label="名称" width="140">
      </el-table-column>
      <el-table-column prop="data_url" label="链接" width="140">
        <el-link
          type="primary"
          href="http://www.sj021.com/bo/220802-2-1.html"
          target="_blank"
          underline
          >前往观看</el-link
        >
      </el-table-column>
      <el-table-column prop="data_text" label="上榜理由"> </el-table-column>
      <el-table-column
        prop="likes"
        label="点赞数"
        width="140"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <el-button type="text" size="small" @click="handleClick"
            >点赞</el-button
          >
          <el-button type="text" size="small">点踩</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p></p>
    <div class="demo-pagination-block">
      <el-pagination
        :currentPage="1"
        :page-size="10"
        :page-sizes="[5, 10, 20]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="30"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import http from '../../utils/http';

interface IState {
  search: string;
  pageParams: {
    pageNum: number;
    pageSize: number;
    total: number;
  };
  tableData: {
    id: number; // 数据id
    data_type: string; // 数据类型
    data_name: string; // 数据名称
    data_url: string; // 数据网址
    data_text: string; // 数据上榜理由
    likes: number; // 点赞数
  }[];
}

const state: IState = reactive({
  search: '',
  pageParams: {
    pageNum: 1,
    pageSize: 10,
    total: 0
  },
  tableData: []
});

// 页面加载自动调用onMounted方法
onMounted(() => {
  getListData();
});

const input = ref('');

const handleClick = () => {
  console.log('click');
};
const getListData = async () => {
  try {
    const data = await getVideoShare({
      pageNum: state.pageParams.pageNum,
      pageSize: state.pageParams.pageSize,
      search: state.search
    });
    if (data) {
      console.log(data);
      // state.tableData = data.list;
      // state.pageParams.total = data.totalCount;
    }
  } catch (e) {
    console.log(e);
  }
};

const getVideoShare = (data: {
  pageNum: number;
  pageSize: number;
  search: string;
}) => {
  return http({
    method: 'get',
    url: '/api/share',
    data
  });
};

// let tableData = ref(Array());

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>
