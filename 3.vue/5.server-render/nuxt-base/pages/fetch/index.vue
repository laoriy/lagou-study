<template>
    <div>{{ data.title }}</div>
    <ul>
        <li v-for="item in data.data" :key="item.id">
            <RouterLink :to="'/fetch/' + item.id" >{{ item.title }}</RouterLink>
        </li>
    </ul>
</template>

<script setup>
const { data } = await useFetch("http://localhost:3000/data.json")
</script>

<style lang="scss" scoped></style>
