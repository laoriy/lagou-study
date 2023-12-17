<template>
    <Login :isLogin="true" :errors="errors" @submit="handleLogin" />
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["no-auth"],
})

import { login } from "~/service/user"
import type { LoginParams } from "~/service/user"
import type { UserInfo } from "~/stores"

const router = useRouter()
const errors = ref({})
const { setUser } = userStore()
const handleLogin = async (user: LoginParams) => {
    const { data, error } = await login(user)

    if (error.value) {
        errors.value = error.value?.data.errors
        return
    }

    setUser(data.value.user)
    router.push("/")
}
</script>

<style scoped></style>
