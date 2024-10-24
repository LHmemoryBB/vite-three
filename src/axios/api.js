import { axios } from "./index.js";

//获取工厂概况
export function getFactoryStaApi(parameter) {
  return axios({
    url: "/getFactorySta",
    method: "get",
    params: parameter,
  });
}
// 获取能源信息
export function getEnergyApi(parameter) {
  return axios({
    url: "/energy",
    method: "get",
    params: parameter,
  });
}