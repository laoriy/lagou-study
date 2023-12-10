<template>
    <div>
        <h1>Welcome to the homepage</h1>
        <h2>a 链接</h2>
        <a href="/about">about页面</a>
        <h2>RouterLink 链接</h2>
        <RouterLink to="/about">to about 页面</RouterLink>
        <h2>编程式$router导航</h2>
        <button @click="$router.push('/about')">点击跳转about</button>
        <h2>编程式useRouter导航</h2>
        <button @click="router.push('/users')">点击跳转users</button>
        <h2>跳转到fetch页面</h2>
        <button @click="router.push('/fetch')">点击跳转fetch</button>
    </div>
</template>

<script setup>
definePageMeta({
    layout: false,
})
const router = useRouter()
</script>

<style lang="scss" scoped></style>
