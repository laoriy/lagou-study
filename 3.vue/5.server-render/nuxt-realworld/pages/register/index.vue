<template>
    <Login :isLogin="false" :errors="errors" @submit="handleRegister" />
</template>

<script setup lang="ts">
import { register } from "~/service/login"
import type { RegisterParams } from "~/service/login"
import type { UserInfo } from "~/stores"
import { userStore } from "~/stores"

const router = useRouter()
const errors = ref({})
const { setUser } = userStore()
const handleRegister = async (user: RegisterParams) => {
    const { data, error } = await register(user)

    if (error.value) {
        errors.value = error.value?.data.errors
        return
    }
    setUser((data.value as any).user as UserInfo)
    router.push("/")
}
</script>

<style scoped></style>
