<template>
    <Login :isLogin="true" :errors="errors" @submit="handleLogin" />
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["no-auth"],
})

import { login } from "~/service/user"
import type { LoginParams } from "~/service/user"
import useError from "~/hooks/useError"

const router = useRouter()
const { errors, setErrors } = useError()
const { setUser } = userStore()
const handleLogin = async (user: LoginParams) => {
    const { data, error } = await login(user)

    if (setErrors(error)) return

    setUser(data.value.user)
    router.push("/")
}
</script>

<style scoped></style>
