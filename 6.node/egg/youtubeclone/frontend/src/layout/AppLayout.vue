<!-- src\layout\AppLayout.vue -->
<template>
    <AppHeader />
    <AppSidebar />
    <!-- 子路由出口 -->
    <router-view />
</template>

<script lang="ts" setup>
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

</script>