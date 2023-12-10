<template>
    <div>
        详情页：{{ id }}
        <p>{{ detail.title }} details</p>
    </div>
</template>

<script setup>
const route = useRoute()
const id = Number(route.params.id)
const { data } = await useFetch("http://localhost:3000/data.json")
const detail = data.value.data.find((d) => d.id === id)
</script>

<style lang="scss" scoped></style>
