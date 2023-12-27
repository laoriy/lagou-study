<template>
    <Login :isLogin="false" :errors="errors" @submit="handleRegister" />
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["no-auth"],
})
import { register } from "~/service/user"
import type { RegisterParams } from "~/service/user"
import { userStore } from "~/stores"
import useError from "~/hooks/useError"

const router = useRouter()
const { errors, setErrors } = useError()
const { setUser } = userStore()
const handleRegister = async (user: RegisterParams) => {
    const { data, error } = await register(user)
    if (setErrors(error)) return

    setUser(data.value.user)
    router.push("/")
}
</script>

<style scoped></style>
