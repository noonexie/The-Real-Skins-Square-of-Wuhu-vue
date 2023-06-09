<template>
  <div>
    <div>
      <p>日程安排</p>
      <el-date-picker
        v-model="state.search"
        type="date"
        placeholder="Pick a day"
      />
      <el-button type="primary" @click="getListData">按时间搜索</el-button>
      <el-button type="primary" @click="routerPS">添加日程</el-button>
      <p></p>
    </div>

    <el-table
      stripe
      style="width: 100%"
      :data="state.tableData"
      :default-sort="{ prop: 'start', order: 'ascending' }"
    >
      <!-- <el-table-column prop="id" label="ID" width="100" sortable>
      </el-table-column> -->

      <el-table-column prop="start" label="起始时间" sortable>
        <template #default="scope">
          {{ getTime(scope.row.start) }}
          <el-tag type="success">{{ getWeek(scope.row.start) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="end" label="终止时间">
        <template #default="scope">
          {{ getTime(scope.row.end) }}
          <el-tag type="success">{{ getWeek(scope.row.end) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="user" label="用户名">
        <template #default="scope">
          {{ getUserName(scope.row.user) }}
        </template>
      </el-table-column>

      <el-table-column prop="things" label="可玩事项"> </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            link
            size="small"
            @click="changeLikes(1, scope.row.id)"
          >
            通知
          </el-button>

          <el-button
            type="primary"
            link
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
            <el-button type="primary" link size="small">添加图片</el-button>
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
import { onActivated, reactive, ref } from "vue";
import { ElMessage, UploadProps } from "element-plus";
import { getAllSchedule, putImg, putLikes, getTitle } from "@/api/skins";
import VueRouter from "../../main";
import { getUserById, putUserInfo } from "@/api/skins";

//定义数据结构
interface IState {
  search: Date;
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
  search: new Date(),
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
      state.tableData = data.data.data.records;
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

// 求时间
const getTime = (time: Date) => {
  if (time) {
    let date = new Date(time);
    let year = date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 拼接
    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  } else {
    return "";
  }
};

// 求周几
const getWeek = (day: Date) => {
  let week = new Date(day).getDay();
  if (week == 0) return "星期日";
  if (week == 1) return "星期一";
  if (week == 2) return "星期二";
  if (week == 3) return "星期三";
  if (week == 4) return "星期四";
  if (week == 5) return "星期五";
  if (week == 6) return "星期六";
};

const getUserName = async (id: number) => {
  console.log(id);
  const res = await getUserById(id);
  if (res) {
    const name = res.data.data.nickname;
    return name;
  } else console.log("res.data.data.nickname");
};

const handleSizeChange = (val: number) => {
  state.pageParams.pageSize = val;
  getListData();
};

const handleCurrentChange = (val: number) => {
  state.pageParams.pageNum = val;
  getListData();
};
</script>
