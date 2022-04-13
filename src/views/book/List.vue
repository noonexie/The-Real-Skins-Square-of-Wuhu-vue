<template>
  <div>
    <div>
      <p>图书列表</p>
      <el-input
        v-model="state.search"
        style="width: 30%"
        placeholder="请输入关键字"
        clearable
      />
      <el-button type="primary" @click="getListData">按关键字搜索</el-button>
      <p></p>
    </div>

    <el-table
      stripe
      style="width: 100%"
      :data="state.tableData"
      :default-sort="{ prop: 'id', order: 'descending' }"
    >
      <el-table-column prop="id" label="ID" width="100" sortable>
      </el-table-column>

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
            >前往观看
          </el-link>
        </template>
      </el-table-column>

      <el-table-column prop="dataText" label="上榜理由"> </el-table-column>

      <el-table-column prop="likes" label="点赞数" width="140" sortable>
      </el-table-column>

      <el-table-column label="图片" width="140">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="(scope.row.imgUrl || state.strNull).split(state.strSplit)[0]"
            :preview-src-list="
              (scope.row.imgUrl || state.strNull).split(state.strSplit)
            "
            :initial-index="4"
            fit="contain"
            :preview-teleported="true"
          />
          <!-- preview-teleported="true"解决预览被表格遮挡问题 -->
        </template>
      </el-table-column>

      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="changeLikes(1, scope.row.id)"
          >
            点赞
          </el-button>

          <el-button
            type="text"
            size="small"
            @click="changeLikes(0, scope.row.id)"
          >
            点踩
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
import { getAllShare, putImg, putLikes } from "@/api/skins";

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
    dataType: string; // 数据类型
    dataName: string; // 数据名称
    dataUrl: string; // 数据网址
    dataText: string; // 数据上榜理由
    imgUrl: string; // 图片地址字符串集
    likes: number; // 点赞数
  }[];
  // dataImage: string[][]; //图片地址字符串数组//弃用改为scope方式
  strSplit: string;
  strNull: string;
}

const state: IState = reactive({
  search: "",
  pageParams: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
  tableData: [],
  dataImage: [],
  strSplit: ",",
  strNull: "",
});

// 页面加载自动调用onMounted方法
// 路由点击即自动调用onMounted方法
onActivated(() => {
  getListData();
});

const changeLikes = (changeType: number, id_h: number) => {
  putLikes({ id: id_h, type: changeType });
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
    const data = await getAllShare({
      pageNum: state.pageParams.pageNum,
      pageSize: state.pageParams.pageSize,
      type: "book",
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
