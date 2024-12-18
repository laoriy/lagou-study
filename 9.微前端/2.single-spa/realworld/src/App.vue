<template>
  <div>
    <Parcel :config="parcelConfig" :mountParcel="mountRootParcel" />
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <router-link to="/">foo</router-link>
      <router-link to="/bar">bar</router-link>
      <button @click="handleClick">button say hello</button>

    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Parcel from 'single-spa-vue/parcel'
import { mountRootParcel } from 'single-spa'
import { onMounted } from 'vue';
const parcelConfig = window.System.import('@laoriy/navbar')

async function handleClick() {
  const toolsModule = await window.System.import("@laoriy/tools")
  toolsModule.sayHello("@laoriy/realworld say hello")
}

onMounted(async () => {
  const toolsModule = await window.System.import("@laoriy/tools")
  toolsModule.sharedSubject.subscribe(console.log)
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
