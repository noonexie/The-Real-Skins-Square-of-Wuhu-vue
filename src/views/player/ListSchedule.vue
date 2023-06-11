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

      <el-table-column prop="username" label="用户名"> </el-table-column>

      <el-table-column prop="things" label="可玩事项"> </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-tooltip
            content="创建人点击后邮箱广播该条目至所有用户"
            placement="top"
          >
            <el-button
              type="warning"
              link
              size="small"
              @click="connectOther(scope.row.user, scope.row.id)"
            >
              广播
            </el-button>
          </el-tooltip>
          <el-tooltip
            content="对该条目感兴趣，点击邮箱通知其创建人"
            placement="top"
          >
            <el-button
              type="primary"
              link
              size="small"
              @click="connectCreator(scope.row.id, scope.row.user)"
            >
              联系
            </el-button>
          </el-tooltip>
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
import { ElMessage } from "element-plus";
import { getAllSchedule, sendToUser, sendToOther } from "@/api/skins";
import VueRouter from "../../main";
import { getUserById } from "@/api/skins";

//定义数据结构
interface IState {
  search: Date;
  pageParams: {
    pageNum: number;
    pageSize: number;
    total: number;
  };
  tableData: {
    start: Date; // 起
    end: Date; // 止
    user: number; // 用户id
    username: string; // 用户名
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

const connectOther = async (id_user: number, id_thing: number) => {
  const userInfo = localStorage.getItem("user");
  if (userInfo) {
    let id_from: number = JSON.parse(userInfo).data;
    if (id_from == id_user) {
      const res = await sendToOther({ thingId: id_thing });
      if (res.data.code == 0) {
        ElMessage({
          message: "通知成功",
          type: "success",
        });
      }
    } else {
      ElMessage({
        message: "您不是该条目创建者，无权通知",
        type: "error",
      });
    }
  } else {
    ElMessage({
      message: "通知失败：未登录",
      type: "error",
    });
  }
};

const connectCreator = async (id: number, id_user: number) => {
  const userInfo = localStorage.getItem("user");
  if (userInfo) {
    let id_from: number = JSON.parse(userInfo).data;
    if (id_from == id_user) {
      ElMessage({
        message: "您是该条目创建者，无需联系",
        type: "error",
      });
    } else {
      const res = await sendToUser({ fromId: id_from, thingId: id });
      if (res.data.code == 0) {
        ElMessage({
          message: "联系成功",
          type: "success",
        });
      }
    }
  } else {
    ElMessage({
      message: "联系失败：未登录",
      type: "error",
    });
  }
};

const getListData = async () => {
  state.tableData = [];
  try {
    const data = await getAllSchedule({
      pageNum: state.pageParams.pageNum,
      pageSize: state.pageParams.pageSize,
      search: state.search,
    });
    if (data) {
      state.tableData = data.data.data.records;
      state.pageParams.total = data.data.data.total;
      for (let i = 0; i < state.pageParams.total; i++) {
        // const dataTemp = data.data.data.records[i];
        const res = await getUserById(data.data.data.records[i].user);
        state.tableData[i].username = res.data.data.nickname;
        // state.tableData.push(dataTemp);
      }
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
  if (week == 0) return "周日";
  if (week == 1) return "周一";
  if (week == 2) return "周二";
  if (week == 3) return "周三";
  if (week == 4) return "周四";
  if (week == 5) return "周五";
  if (week == 6) return "周六";
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
