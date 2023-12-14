<template>
    <Login :isLogin="true" :errors="errors" @submit="handleLogin" />
</template>

<script setup lang="ts">
import { login } from "~/service/login"
import type { LoginParams } from "~/service/login"
const router = useRouter()
const errors = ref({})
const handleLogin = async (user: LoginParams) => {
    const { data, error } = await login(user)

    if (error.value) {
        errors.value = error.value?.data.errors
        return
    }
    if (data.value) router.push("/")
}
</script>

<style scoped></style>
