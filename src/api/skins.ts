import http from "../utils/http";

// 真皮广场 --------------------------------------------------------------------------------------------------------------------------------
/**
 * 数据查询接口
 */
export const getShare = (params: {
  // 不加params：get的参数传不进去，即不会/share?num=X&size=X&这样请求
  pageNum: number;
  pageSize: number;
  type: string;
  search: string;
}) => {
  return http({
    method: "get",
    url: "/api/share",
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
  likes: number;
}) => {
  return http({
    method: "post",
    url: "/api/share",
    data,
  });
};

/**
 * 数据修改接口
 */
export const putShare = (data: {
  id: number;
  dataType: string;
  dataName: string;
  dataUrl: string;
  dataText: string;
  likes: number;
}) => {
  return http({
    method: "put",
    url: "/api/share",
    data,
  });
};
