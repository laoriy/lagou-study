<template>
    <Login :isLogin="true" @submit="handleLogin" />
</template>

<script setup lang="ts">
import { login } from "~/service/login"
import type { LoginParams } from "~/service/login"
const router = useRouter()
const handleLogin = async (user: LoginParams) => {
    const { data } = await login(user)
    console.log(data.value)
    if (data.value) {
        router.push("/")
    }
}
</script>

<style scoped></style>
