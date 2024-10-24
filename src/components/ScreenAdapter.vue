<template>
  <div class="ScreenAdapter" :style="style">
    <slot />
  </div>
</template>
  
  <script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

// Props
const props = defineProps({
  width: {
    type: String,
    default: "2560"
  },
  height: {
    type: String,
    default: "1350"
  },
  fullScreen: {
    type: Boolean,
    default: true
  }
});

// Style ref
const style = ref({
  width: `${props.width}px`,
  height: `${props.height}px`,
  transform: "scale(1) translate(-50%, -50%)"
});

// Debounce function
const Debounce = (fn, delay = 500) => {
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
};

// Function to get scale
const getScale = () => {
  const clientWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  const clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;

  const w = clientWidth / props.width;
  const h = clientHeight / props.height;

  if (props.fullScreen) {
    return [w, h];
  }

  const scale = Math.min(w, h);
  return [scale, scale];
};

// Function to set scale
const setScale = () => {
  const scale = getScale();
  style.value.transform = `scale(${scale[0]}, ${scale[1]}) translate(-50%, -50%)`;
};

// Lifecycle hooks
onMounted(() => {
  setScale();
  window.addEventListener("resize", Debounce(setScale, 1000));
});

onUnmounted(() => {
  window.removeEventListener("resize", Debounce(setScale, 1000));
});
</script>
  
<style scoped lang="scss">
.ScreenAdapter {
  position: absolute;
  transform-origin: 0 0;
  left: 50%;
  top: 50%;
  transition: 0s;
  box-sizing: border-box;
}
</style>