import http from "../utils/http";

// 真皮广场 --------------------------------------------------------------------------------------------------------------------------------
/**
 * 按ID查询
 */
export const getShareById = (id: number) => {
  return http({
    method: "get",
    url: `/api/share/listById/${id}`,
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
    url: "/api/share/listAll",
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
    url: "/api/share/dataShare",
    data,
  });
};

/**
 * 数据修改接口
 */
export const putLikes = (data: any) => {
  return http({
    method: "put",
    url: "/api/share",
    data,
  });
};
