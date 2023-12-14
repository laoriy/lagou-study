<template>
    <Login :isLogin="false" :errors="errors" @submit="handleRegister" />
</template>

<script setup lang="ts">
import { register } from "~/service/login"
import type { RegisterParams } from "~/service/login"
const router = useRouter()
const errors = ref({})
const handleRegister = async (user: RegisterParams) => {
    const { data, error } = await register(user)

    if (error.value) {
        errors.value = error.value?.data.errors
        return
    }
    if (data.value) router.push("/")
}
</script>

<style scoped></style>
