<!--
 * @Description: 
 * @version: 
 * @Author: SZF
 * @Date: 2024-03-28 11:30:35
 * @LastEditors: SZF
 * @LastEditTime: 2024-05-22 14:01:34
-->
<template>
  <screen-adapter width="1920" height="1080">
    <div class="board-screen">
      <div class="screen-title">
        展厅可视化看板
      </div>
    </div>
  </screen-adapter>
</template>
<script setup>
import ScreenAdapter from "../components/ScreenAdapter.vue";
</script>



<style lang="scss" scoped>
.board-screen {
  width: 100%;
  height: 100%;
  background-image: url('');
  .screen-title {
    height: 80px;
    width: 100%;
    font-size: 48px;
    text-align: center;
  }
}
</style>