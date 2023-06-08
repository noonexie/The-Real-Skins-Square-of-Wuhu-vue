<template>
  <div>
    <div>
      <p>日程安排</p>
      <el-input
        v-model="state.search"
        style="width: 30%"
        placeholder="请输入关键字"
        clearable
      />
      <el-button type="primary" @click="getListData">按时间搜索</el-button>
      <el-button type="primary" @click="routerPS">添加日程</el-button>
      <p></p>
    </div>

    <el-table
      stripe
      style="width: 100%"
      :data="state.tableData"
      :default-sort="{ prop: 'start', order: 'descending' }"
    >
      <!-- <el-table-column prop="id" label="ID" width="100" sortable>
      </el-table-column> -->

      <el-table-column prop="start" label="起始时间" sortable>
      </el-table-column>

      <el-table-column prop="end" label="终止时间"> </el-table-column>

      <el-table-column prop="user" label="用户名"> </el-table-column>

      <el-table-column prop="things" label="可玩事项"> </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="changeLikes(1, scope.row.id)"
          >
            通知
          </el-button>

          <el-button
            type="text"
            size="small"
            @click="changeLikes(0, scope.row.id)"
          >
            联系
          </el-button>

          <el-upload
            class="upload-demo"
            action="/api/share/imgUpload/"
            :limit="1"
            :on-success="
              (response: any) => {
                return addImg(response, scope.row.id);
              }
            "
            :on-exceed="handleExceed"
          >
            <el-button type="text" size="small">添加图片</el-button>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
    <p></p>
    <div>
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
import { onActivated, reactive } from "vue";
import { ElMessage, UploadProps } from "element-plus";
import { getAllSchedule, putImg, putLikes, getTitle } from "@/api/skins";
import VueRouter from "../../main";

//定义数据结构
interface IState {
  search: string;
  pageParams: {
    pageNum: number;
    pageSize: number;
    total: number;
  };
  tableData: {
    id: number; // 数据id
    start: Date; // 起
    end: Date; // 止
    user: string; // 用户
    things: string; // 事件
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
// 路由点击即自动调用onMounted方法
onActivated(() => {
  getListData();
});

const changeLikes = (changeType: number, id_h: number) => {
  putLikes({ id: id_h, type: changeType });
  // state.tableData[id_h].likes++;
  getListData();
};

// 上传成功的图片
const addImg = async (response: any, id_r: number) => {
  const res = await putImg({ id: id_r, url: response.data });
  // console.log(response);
  // console.log(res);
  if (res.data.code == 0) {
    ElMessage({
      message: "添加成功",
      type: "success",
    });
  }
  getListData();
};

const handleExceed: UploadProps["onExceed"] = () => {
  ElMessage.warning(`一次只能添加一张图片
  请清除页面上传记录后再次提交`);
};

const getListData = async () => {
  try {
    const data = await getAllSchedule({
      pageNum: state.pageParams.pageNum,
      pageSize: state.pageParams.pageSize,
      search: state.search,
    });
    if (data) {
      console.log(data.data.data);
      state.tableData = data.data.data.records;
      // console.log(state.tableData);
      state.pageParams.total = data.data.data.total;
    }
  } catch (e) {
    // console.log(e);
  }
};

// 路由跳转
const routerPS = () => {
  VueRouter.push("/player/PSchedule");
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
