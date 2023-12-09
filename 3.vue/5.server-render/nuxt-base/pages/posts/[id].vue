<template>
    <div>动态路由参数：{{ id }}</div>
</template>

<script setup>
const id = ref(null)

const route = useRoute()

id.value = route.params.id
</script>

<style lang="scss" scoped></style>
