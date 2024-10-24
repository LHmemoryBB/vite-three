/*
 * @Description: 
 * @version: 
 * @Author: SZF
 * @Date: 2024-03-28 11:26:25
 * @LastEditors: SZF
 * @LastEditTime: 2024-05-29 17:49:40
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import BigScreen from '@/views/BigScreen.vue';
import ViewBoard from '@/views/ViewBoard.vue'


// 2. 定义一些路由
const routes = [
  {
    path: '/',
    redirect: '/bigscreen'  // 当 URL 为空时，重定向到 /home
  },
  { 
    path: '/viewBoard', 
    component: ViewBoard 
  },
  { 
    path: '/bigscreen', 
    component: BigScreen 
  },
  
]

// 3. 创建路由实例并传递 `routes` 配置
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router;