<template>
    <div>
        <h1>Welcome to the homepage</h1>
        <h2>a 链接</h2>
        <a href="/about">about页面</a>
        <h2>RouterLink 链接</h2>
        <RouterLink  to="/about">to about 页面</RouterLink>
        <h2>编程式$router导航</h2>
        <button @click="$router.push('/about')">点击跳转</button>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
