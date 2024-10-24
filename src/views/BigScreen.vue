<!--
 * @Description: 
 * @version: 
 * @Author: SZF
 * @Date: 2024-03-28 11:30:35
 * @LastEditors: SZF
 * @LastEditTime: 2024-05-22 14:01:34
-->


<template>
  <screen-adapter>
    <!-- 大屏视图 -->
    <div class="bigScreen-view">
      <!-- 标题部分 -->
      <div class="screen-title">
        <div class="title">智慧工厂数字孪生</div>
        <div class="title-right">
          <div class="time">
            <!-- 显示当前时间（时:分:秒） -->
            <p class="hour">{{ dayjs().format("HH:mm:ss") }}</p>
            <!-- 显示当前日期（年 月 日） -->
            <p class="year">{{ dayjs().format("YYYY MM DD") }}</p>
          </div>
          <!-- 右侧图标和温度显示 -->
          <img src="@/assets/img/sun.png" alt="" />
          <img src="@/assets/img/tem.png" alt="" />
          <span class="tem-num">17℃</span>
        </div>
      </div>

      <!-- 内容部分 -->
      <div class="screen-content">
        <!-- 左侧内容 -->
        <div class="left-content">
          <!-- 工厂概况模块 -->
          <div>
            <div class="module-title">工厂概况</div>
            <div class="module-content">
              <!-- 循环显示工厂概况项 -->
              <div v-for="(item, index) in OverviewOptions" class="module-item">
                <img :src="getUrl(item.url)" alt="" />
                <div>
                  <div class="text">{{ item.text }}</div>
                  <div class="value">
                    <!-- 动态设置数值颜色和边距 -->
                    <span :style="{ color: item.valueColor, margin: '10px' }">{{
                      item.value
                    }}</span>
                    {{ item.unit }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 设备统计模块 -->
          <div>
            <div class="module-title">设备统计</div>
            <div class="module-content">
              <!-- 统计数值显示 -->
              <div class="module-static">
                <div v-for="item in staticList" class="statistic">
                  <!-- 动态设置数值的渐变样式 -->
                  <div
                    class="sta-value"
                    :style="getGradientTextStyle(item.color)"
                  >
                    {{ item.value }}
                  </div>
                  <div class="sta-name">{{ item.name }}</div>
                </div>
              </div>

              <!-- 设备统计项 -->
              <div class="dev-static">
                <div
                  v-for="(item, index) in deviceStaList"
                  :key="index"
                  class="dev-item"
                >
                  <img class="dev-img" :src="getUrl(item.img)" alt="" />
                  <div>
                    <div class="dev-name">{{ item.name }}</div>
                    <div class="dev-value">{{ item.value }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 中间内容，留空 -->
        <div class="middle-content"></div>

        <!-- 右侧内容 -->
        <div class="right-content">
          <!-- 订单总览模块 -->
          <div>
            <div class="module-title">订单总览</div>
            <div class="shaper-content">
              <!-- 订单总量 -->
              <div class="shaper-item">
                <div style="position: relative;">
                  <div class="shaper-text">
                    <div class="text-label">订单总量</div>
                    <div class="text-value">77</div>
                  </div>
                  <img src="@/assets/img/Sphere_blue.png" alt="" />
                </div>
              </div>

              <!-- 已完成量和未完成量 -->
              <div class="shaper-item shaper-bottom">
                <div style="position: relative;">
                  <div class="shaper-text">
                    <div>已完成量</div>
                    <div class="text-value">32</div>
                  </div>
                  <img src="@/assets/img/Sphere_yellow.png" alt="" />
                </div>
                <div style="position: relative;">
                  <div class="shaper-text">
                    <div>未完成量</div>
                    <div class="text-value">45</div>
                  </div>
                  <img
                    src="@/assets/img/Sphere_green.png"
                    alt=""
                    class="shapper-img"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 在制统计模块 -->
          <div>
            <div class="module-title" style="margin-top:0">在制统计</div>
            <div class="module-content">
              <!-- 循环显示在制统计项 -->
              <div
                v-for="(item, index) in ongoingStatistics"
                class="ongoing-item"
              >
                <div class="value">{{ item.value }}</div>
                <div>{{ item.name }}</div>
              </div>
            </div>
          </div>

          <!-- 能源统计模块 -->
          <div>
            <div class="module-title">能源统计</div>
            <div class="module-content">
              <!-- 循环显示能源统计项 -->
              <div
                v-for="(item, index) in EnergyStatistics"
                class="energy-item"
                :class="`energy-item${index + 1}`"
              >
                <img :src="getUrl(item.url)" alt="" srcset="" />
                <!-- 循环显示每个能源项的具体数据 -->
                <div v-for="(data, dataIndex) in item.dataList">
                  <div
                    class="energy-value"
                    :style="{ color: item.color, '--color': item.color }"
                  >
                    {{ data.value }}
                  </div>
                  <div>{{ data.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </screen-adapter>
</template>
<script setup>
import { getFactoryStaApi, getEnergyApi } from "@/axios/api.js";
import dayjs from "dayjs";
import { reactive, ref } from "vue";
import ScreenAdapter from "../components/ScreenAdapter.vue";
const images = import.meta.glob("/src/assets/img/*.png", { eager: true });
// 工厂概况模块数据
const OverviewOptions = reactive([
  {
    url: "zmj",
    text: "总面积",
    value: 1098,
    unit: "m³",
    valueColor: "#FFE04D"
  },
  {
    url: "jzsl",
    text: "建筑数量",
    value: 22,
    unit: "幢",
    valueColor: "#34F5FF"
  },
  {
    url: "ygzs",
    text: "员工总数",
    value: 120,
    unit: "人",
    valueColor: "#34F5FF"
  },
  {
    url: "cqrs",
    text: "出勤人数",
    value: 107,
    unit: "人",
    valueColor: "#34F5FF"
  }
]);

// 设备统计数据
const staticList = reactive([
  {
    name: "总数（台）",
    value: 60,
    color: "linear-gradient(0deg, #FFCC00 0%, #E7F9FF 0%, #3196FE 100%)"
  },
  {
    name: "运行（台）",
    value: 60,
    color: "linear-gradient(0deg, #FFCC00 0%, #E7FEFF 0%, #4EFFE8 100%)"
  },
  {
    name: "空闲（台）",
    value: 60,
    color: "linear-gradient(0deg, #FFCC00 0%, #FFFDE7 0%, #FFCC00 100%)"
  },
  {
    name: "离线（台）",
    value: 60,
    color: "linear-gradient(0deg, #FFCC00 0%, #E6E6E6 0%, #9B9EA8 100%)"
  },
  {
    name: "告警（台）",
    value: 60,
    color: "linear-gradient(0deg, #FFCC00 0%, #FFE7E7 0%, #FF6060 100%)"
  }
]);
// 设备统计具体数据
const deviceStaList = reactive([
  {
    name: "水车专机",
    value: 13,
    img: "sczj"
  },
  {
    name: "切削球专机",
    value: 2,
    img: "qxj"
  },
  {
    name: "上料机",
    value: 2,
    img: "slj"
  },
  {
    name: "组装机",
    value: 3,
    img: "zzj"
  },
  {
    name: "烘干机",
    value: 5,
    img: "hgj"
  },
  {
    name: "测试机",
    value: 2,
    img: "csj"
  },
  {
    name: "检测机",
    value: 2,
    img: "jcj"
  },
  {
    name: "装配机",
    value: 2,
    img: "zpj"
  }
]);
// 在制统计
const ongoingStatistics = reactive([
  {
    name: "在制总箱数",
    value: 60
  },
  {
    name: "在制产品数",
    value: 60
  },
  {
    name: "在制总量",
    value: 60
  },
  {
    name: "存放超出30日箱数",
    value: 60
  }
]);
// 能源统计
const EnergyStatistics = reactive([
  {
    url: "water",
    color: "#35B1FF",
    dataList: [
      {
        name: "本年水耗(m³)",
        value: 8640
      },
      {
        name: "本月水耗(m³)",
        value: 864
      },
      {
        name: "本周水耗(m³)",
        value: 86
      }
    ]
  },
  {
    url: "lightning",
    color: "#FFCC00",
    dataList: [
      {
        name: "本年电耗(KW·H)",
        value: 8640
      },
      {
        name: "本月电耗(KW·H)",
        value: 864
      },
      {
        name: "本周电耗(KW·H)",
        value: 86
      }
    ]
  },
  {
    url: "gas",
    color: "#47F8CC",
    dataList: [
      {
        name: "本年气耗(m³)",
        value: 8640
      },
      {
        name: "本月气耗(m³)",
        value: 864
      },
      {
        name: "本周气耗(m³)",
        value: 86
      }
    ]
  }
]);

// 动态设置文字样式
function getGradientTextStyle(color) {
  return {
    background: color,
    "-webkit-background-clip": "text", // 兼容 Safari 浏览器
    "background-clip": "text", // 其他浏览器
    color: "transparent" // 文字透明
  };
}
const typeList = [
  "fac_overView",
  "dev_stastic",
  "dev_stastic_item",
  "order_overView",
  "producting"
];
const totalValue = ref([]);

// 动态请求接口，遍历typeList
async function getData(params) {
  const promises = typeList.map(item => {
    return getFactoryStaApi({ type: item });
  });
  const results = await Promise.all(promises);
  totalValue.value = results.map(res => res.data);
  console.log(totalValue.value, "12312321");
  setData();
}
// 获取能源分布接口
async function getEnergy(params) {
  const res = await getEnergyApi();
  EnergyStatistics.forEach((item, index) => {
    item.dataList.forEach((y, yIndex) => {
      y.value = res.data[index][yIndex];
    });
  });
}
getData();
getEnergy();
// 获取到接口数据之后设置数据
function setData() {
  OverviewOptions.forEach((item, index) => {
    item.value = totalValue.value[0][index];
  });
  staticList.forEach((item, index) => {
    item.value = totalValue.value[1][index];
  });
  deviceStaList.forEach((item, index) => {
    item.value = totalValue.value[2][index];
  });
  ongoingStatistics.forEach((item, index) => {
    item.value = totalValue.value[4][index];
  });
}
function getUrl(url) {
  const path = `/src/assets/img/${url}.png`;
  return images[path].default;
}
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "YOUSHEBIAOTIHEI";
  src: url("@/assets/font/YOUSHEBIAOTIHEI-2.TTF");
}
@font-face {
  font-family: "Bebas";
  src: url("@/assets/font/Bebas.TTF");
}
@font-face {
  font-family: Vox-Regular2;
  src: url("@/assets/font/VOX_WIDE_BOLD.woff");
}
.bigScreen-view {
  height: 100%;
  width: 100%;
  background-image: url("@/assets/img/screen-bg.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  .screen-title {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 48px;
      color: #ffffff;
      text-shadow: 5px 3px 0px rgba(17, 20, 22, 0.22);
      font-family: "YOUSHEBIAOTIHEI";
      padding-left: 30px;
      padding-top: 12px;
      letter-spacing: 4px;
      // background: linear-gradient(
      //   0deg,
      //   rgba(80, 140, 229, 0.22) 0%,
      //   rgba(255, 255, 255, 0.22) 100%
      // );
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
    }
    .title-right {
      display: flex;
      align-items: center;
    }
    .time,
    .tem-num {
      color: #ffffff;
      padding-right: 20px;
      margin-right: 20px;
      .hour {
        font-size: 20px;
      }
      .year {
        font-size: 10px;
      }
    }
    .time {
      border-right: 1px solid #fff;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .tem-num {
      font-size: 22px;
    }
    img {
      width: 28px;
      height: 28px;
      margin: 0 10px;
    }
  }
  .screen-content {
    flex: 1;
    width: 100%;
    position: relative;
    .module-title {
      width: 420px;
      height: 50px;
      font-family: YOUSHEBIAOTIHEI;
      font-size: 35px;
      background-image: url("@/assets/img/modult-title-bg.png");
      background-size: 100% 100%;
      line-height: 42px;
      text-align: left;
      padding-left: 44px;
      margin-top: 40px;
    }
    .module-content {
      display: flex;
      flex-wrap: wrap;
      margin: 30px 0;
      justify-content: space-around;
      .module-item {
        width: calc(50% - 20px);
        margin: 10px;
        display: flex;
        align-items: center;
        img {
          width: 88px;
        }
        .text {
          font-size: 20px;
        }
        .value {
          font-size: 26px;
          font-family: Bebas;
        }
      }
      .module-static {
        width: 95%;
        margin: 15px auto;
        height: 120px;
        background-image: url("@/assets/img/statistic.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .sta-value {
          color: #fff;
          font-size: 33px;
          font-family: Bebas;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .dev-static {
        width: 95%;
        margin: 20px auto;
        display: flex;
        flex-wrap: wrap;
        .dev-item {
          width: 50%;
          display: flex;
          margin: 20px 0;
          justify-content: center;
          align-items: center;
          .dev-img {
            width: 70px;
          }
          .dev-name {
            font-size: 17.75px;
          }
          .dev-value {
            font-size: 27.75px;
            font-family: Bebas;
          }
        }
      }
      .ongoing-item {
        width: 45%;
        height: 100px;
        background-image: url("src/assets/img/box-bg2.png");
        background-size: 100% 100%;
        margin: 7px 0;
        .value {
          font-family: Vox-Regular2;
          font-size: 32px;
          margin-top: 10px;
          color: #47f8cc;
        }
      }
      .energy-item {
        width: 100%;
        height: 100px;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        padding-left: 35px;
        div {
          flex: 1;
        }
        img {
          width: 36px;
          height: 36px;
        }
        .energy-value {
          font-size: 26px;
          font-family: Bebas;
          text-shadow: 0 0 10px var(--color), 0 0 20px var(--color),
            0 0 30px var(--color), 0 0 40px var(--color); //设置发光效果
        }
      }
      .energy-item1 {
        background-image: url("@/assets/img/water-bg.png");
      }
      .energy-item2 {
        background-image: url("@/assets/img/dian-bg.png");
      }
      .energy-item3 {
        background-image: url("@/assets/img/gas-bg.png");
      }
    }
    .shaper-content {
      .shaper-item {
        display: flex;
        justify-content: center;
        // height: 180px;
        width: 100%;
        position: relative;
        .shaper-text {
          position: absolute;
          height: 100%;
          width: 150px;
          left: 0;
          top: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .text-label {
            // margin-bottom: 15px;
          }
          .text-value {
            font-size: 36px;
            font-family: Bebas;
          }
        }
        // background: red;
        img {
          width: 152px;
          height: 133px;
        }
      }
      .shaper-bottom {
        position: relative;
        bottom: 30px;
        left: 4px;
      }
      .shapper-img {
        width: 165px;
        position: relative;
        top: 7px;
      }
    }
    .left-content,
    .right-content {
      width: 500px;
      height: 1156px;
      position: absolute;
      top: 80px;
      background: rgba(18, 29, 61, 0.65);
      border-radius: 13px;
      color: #fff;
    }
    .left-content {
      left: 20px;
    }
    .right-content {
      right: 20px;
    }
  }
}
</style>