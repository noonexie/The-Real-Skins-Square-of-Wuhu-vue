<template>
  <div style="padding: 10px; margin-bottom: 50px">
    <el-row>
      <el-col :span="4">
        <el-card style="width: 300px; height: 300px; color: #333">
          <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc">
            在线用户
          </div>
          <div
            style="padding: 10px 0"
            v-for="user in state.users"
            :key="user.username"
          >
            <span style="font-size: 10px; color: cornflowerblue">{{
              user.username
            }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="20">
        <div
          style="
            width: 800px;
            margin: 0 auto;
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 0 10px #ccc;
          "
        >
          <div style="text-align: center; line-height: 50px">聊天室</div>
          <div
            style="height: 350px; overflow: auto; border-top: 1px solid #ccc"
            v-html="state.content"
          ></div>
          <div style="height: 200px">
            <textarea
              v-model="state.text"
              style="
                height: 160px;
                width: 100%;
                padding: 20px;
                border: none;
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                outline: none;
              "
            ></textarea>
            <div style="text-align: right; padding-right: 10px">
              <el-button type="primary" size="small" @click="send"
                >发送</el-button
              >
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { onActivated, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";

// const chatUser = ref("");
const messages = [];
let socket: any;

interface IState {
  text: string;
  username: string;
  users: { username: string }[];
  content: string;
}

const state: IState = reactive({
  text: "",
  username: "",
  users: [],
  content: "",
});

onMounted(() => {
  init();
});

const createContent = (remoteUser: string, nowUser: string, text: string) => {
  // 这个方法是用来将 json的聊天消息数据转换成 html的。
  let html = "";
  // 当前用户消息
  if (nowUser) {
    // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
    html =
      '<div class="el-row" style="padding: 5px 0">\n' +
      '  <div class="el-col el-col-22" style="text-align: right; padding-right: 10px">\n' +
      '    <div class="tip left">' +
      text +
      "</div>\n" +
      "  </div>\n" +
      '  <div class="el-col el-col-2">\n' +
      // '  <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">\n' +
      // '    <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" style="object-fit: cover;">\n' +
      '<span style="font-size: 5px; color: cornflowerblue">\n' +
      state.username +
      "  </span>\n" +
      "  </div>\n" +
      "</div>";
  } else if (remoteUser) {
    // remoteUser表示远程用户聊天消息，蓝色的气泡
    html =
      '<div class="el-row" style="padding: 5px 0">\n' +
      '  <div class="el-col el-col-2" style="text-align: right">\n' +
      // '  <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">\n' +
      // '    <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" style="object-fit: cover;">\n' +
      '<span style="font-size: 5px; color: cornflowerblue">\n' +
      remoteUser +
      "  </span>\n" +
      "  </div>\n" +
      '  <div class="el-col el-col-22" style="text-align: left; padding-left: 10px">\n' +
      '    <div class="tip right">' +
      text +
      "</div>\n" +
      "  </div>\n" +
      "</div>";
  }
  state.content += html;
  // console.log(html);
};

const init = () => {
  const userInfo = localStorage.getItem("user");

  if (userInfo) {
    state.username = JSON.parse(userInfo).name;
  } else {
    ElMessage({
      message: "用户未登录，请从右上角个人信息中登陆/或尝试刷新加载用户信息",
      type: "error",
    });
  }

  // let user = username;
  if (typeof WebSocket == "undefined") {
    console.log("您的浏览器不支持WebSocket");
  } else {
    console.log("您的浏览器支持WebSocket");
    // 生产环境
    let socketUrl = `ws://${location.host}/chat/imserver/` + state.username;
    // 开发环境
    // let socketUrl = `ws://localhost:9090/imserver/` + state.username;
    if (socket != null) {
      socket.close();
      socket = null;
    }
    // 开启一个websocket服务
    socket = new WebSocket(socketUrl);
    //打开事件
    socket.onopen = function () {
      console.log("websocket已打开");
    };
    //  浏览器端收消息，获得从服务端发送过来的文本消息
    socket.onmessage = function (msg: any) {
      let data = JSON.parse(msg.data); // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
      if (data.users) {
        // 获取在线人员信息
        state.users = data.users;
        // console.log(state.users.at(0).username);
        // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
      } else {
        // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
        //  // {"from": "zhang", "text": "hello"}
        // if (data.from === chatUser) {
        messages.push(data);
        // 构建消息内容
        createContent(data.from, "", data.text);
        // }
      }
    };
    //关闭事件
    socket.onclose = function () {
      console.log("websocket已关闭");
    };
    //发生了错误事件
    socket.onerror = function () {
      console.log("websocket发生了错误");
    };
  }
};

const send = () => {
  if (!state.text) {
    ElMessage({
      message: "请输入内容",
      type: "warning",
    });
  } else {
    if (typeof WebSocket == "undefined") {
      console.log("您的浏览器不支持WebSocket");
    } else {
      console.log("您的浏览器支持WebSocket");
      // 组装待发送的消息 json
      // {"from": "zhang", "to": "admin", "text": "聊天文本"}
      let message = {
        from: state.username,
        text: state.text,
      };
      socket.send(JSON.stringify(message)); // 将组装好的json发送给服务端，由服务端进行转发
      messages.push({ user: state.username, text: state.text });
      // 构建消息内容，本人消息
      createContent("", state.username, state.text);
      state.text = "";
    }
  }
};
</script>
<style>
.tip {
  color: white;
  text-align: center;
  border-radius: 10px;
  font-family: sans-serif;
  padding: 10px;
  width: auto;
  display: inline-block !important;
  display: inline;
}
.right {
  background-color: deepskyblue;
}
.left {
  background-color: forestgreen;
}
</style>
