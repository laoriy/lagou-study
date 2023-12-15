<template>
    <Login :isLogin="true" :errors="errors" @submit="handleLogin" />
</template>

<script setup lang="ts">
import { login } from "~/service/login"
import type { LoginParams } from "~/service/login"
import type { UserInfo } from "~/stores"
import { userStore } from "~/stores"

const router = useRouter()
const errors = ref({})
const { setUser } = userStore()
const handleLogin = async (user: LoginParams) => {
    const { data, error } = await login(user)

    if (error.value) {
        errors.value = error.value?.data.errors
        return
    }

    setUser((data.value as any).user as UserInfo)
    router.push("/")
}
</script>

<style scoped></style>
