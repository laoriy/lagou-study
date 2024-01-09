<script setup lang="ts">
/**
 * 方式一：直接在页面局部引入使用
 */
import lGButton from '@laoriy/lg-button'
</script>

<template>
  <div class="test-button">
    <h3>this is a lg-button test</h3>
    <lGButton type="primary">test Button</lGButton>
  </div>
</template>

<style lang="less" scoped>
.test-button {
  width: 100vh;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
