import http from "@/utils/axios";

// 真皮广场 用户登录--------------------------------------------------------------------------------------------------------------------------------
/**
 * 登录接口
 * @param id
 * @returns
 */
export const postLogin = (data: { username: string; password: string }) => {
  return http({
    method: "post",
    url: `/api/user/login`,
    data,
  });
};

/**
 * 注册接口
 * @param id
 * @returns
 */
export const postRegister = (data: {
  username: string;
  password: string;
  nickname: string;
  email: string;
}) => {
  return http({
    method: "post",
    url: `/api/user/register`,
    data,
  });
};

/**
 * 根据id获取用户信息
 * @param id
 * @returns
 */
export const getUserById = (id: number) => {
  return http({
    method: "get",
    url: `/api/user/${id}`,
    // data,
  });
};

/**
 * 用户信息修改
 */
export const putUserInfo = (data: {
  id: number;
  password: string;
  nickname: string;
  avatar: string;
}) => {
  return http({
    method: "put",
    url: `/api/user`,
    data,
  });
};

// 真皮广场 用户分享--------------------------------------------------------------------------------------------------------------------------------
/**
 * 按ID查询
 */
export const getShareById = (id: number) => {
  return http({
    method: "get",
    url: `/share/listById/${id}`,
    // 注意url用``包裹而不是""
  });
};

/**
 * 获取所有数据并分页
 */
export const getAllShare = (params: {
  // 不加params：get的参数传不进去，即不会/share?num=X&size=X&这样请求
  pageNum: number;
  pageSize: number;
  search: string;
}) => {
  return http({
    method: "get",
    url: `/share/listAll`,
    params,
  });
};

export const getAllSchedule = (params: {
  // 不加params：get的参数传不进去，即不会/share?num=X&size=X&这样请求
  pageNum: number;
  pageSize: number;
  search: Date;
}) => {
  return http({
    method: "get",
    url: `/api/schedule/listSchedule`,
    params,
  });
};

/**
 * 数据提交接口
 */
export const postShare = (data: {
  id: number;
  user: number;
  start: Date;
  end: Date;
  things: string;
}) => {
  return http({
    method: "post",
    url: `/api/schedule/putSchedule`,
    data,
  });
};

/**
 * 联系创建者
 */
export const sendToUser = (params: { fromId: number; thingId: number }) => {
  return http({
    method: "get",
    url: `/api/schedule/smtc`,
    params,
  });
};

/**
 * 广播给其他人
 */
export const sendToOther = (params: { thingId: number }) => {
  return http({
    method: "get",
    url: `/api/schedule/smto`,
    params,
  });
};

/**
 * 点赞修改接口
 */
export const putLikes = (params: { id: number; type: number }) => {
  return http({
    method: "put",
    url: `/share/uLikes`,
    params,
  });
};

/**
 * 图片修改接口
 */
export const putImg = (params: { id: number; url: string }) => {
  return http({
    method: "put",
    url: `/share/uImgUrl`,
    params,
  });
};

/**
 * 根据url解析title
 */
export const getTitle = (params: { dataUrl: string }) => {
  return http({
    method: "get",
    url: `/share/urlParse`,
    params,
  });
};

/**
 * 茶杯狐电影搜索
 */
export const searchMovie = (params: {
  // 不加params：get的参数传不进去，即不会/share?num=X&size=X&这样请求
  text: string;
  type: number;
  from: number;
  size: number;
  douban_id: number;
  token: string;
}) => {
  return http({
    method: "get",
    url: `/movie/api/v2/search`,
    params,
  });
};

/**
 * 酷狗音乐搜索
 */
export const searchMusic = (params: {
  // 不加params：get的参数传不进去，即不会/share?num=X&size=X&这样请求
  keyword: string;
  page: number;
}) => {
  return http({
    method: "get",
    url: `/music/song_search_v2`,
    params,
  });
};

/**
 * 酷狗音乐mp3 url获取
 */
export const getMp3Url = (params: {
  // 不加params：get的参数传不进去，即不会/share?num=X&size=X&这样请求
  r: string;
  callback: string;
  mid: number;
  hash: string;
  platid: number;
  album_id: number;
}) => {
  return http({
    method: "get",
    url: `/mp3/yy/index.php`,
    params,
  });
};
