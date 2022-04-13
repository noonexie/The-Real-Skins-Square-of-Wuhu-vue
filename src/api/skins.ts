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
    url: `/user/login`,
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
}) => {
  return http({
    method: "post",
    url: `/user/register`,
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
    url: `/user/${id}`,
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
    url: `/user`,
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
  type: string;
  search: string;
}) => {
  return http({
    method: "get",
    url: `/share/listAll`,
    params,
  });
};

/**
 * 数据提交接口
 */
export const postShare = (data: {
  id: number;
  dataType: string;
  dataName: string;
  dataUrl: string;
  dataText: string;
  imgUrl: string;
  likes: number;
}) => {
  return http({
    method: "post",
    url: `/share/dataShare`,
    data,
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
