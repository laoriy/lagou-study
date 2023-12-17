<template>
    <Login :isLogin="false" :errors="errors" @submit="handleRegister" />
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["no-auth"],
})
import { register } from "~/service/user"
import type { RegisterParams } from "~/service/user"
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
    setUser(data.value.user)
    router.push("/")
}
</script>

<style scoped></style>
