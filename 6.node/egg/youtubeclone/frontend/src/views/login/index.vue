<template>
  <div class="gspRov">
    <h2>Login to your account</h2>
    <form @submit.prevent="handleSubmit">
      <ul v-if="errors" class="errors">
        <li v-for="(error, index) in errors" :key="index">
          {{ `${error.field} ${error.message}` }}
        </li>
      </ul>
      <input v-model="user.email" type="email" placeholder="email" />
      <input v-model="user.password" type="password" placeholder="password" />
      <div class="action input-group">
        <span class="pointer">Signup instead</span>
        <button :disabled="isLoading">Login</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { login } from '@/api/user'
import { useUserStore } from '@/stores/user';
import type { AxiosResponse } from 'axios';
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { setUser } = useUserStore()

const user = reactive({
  email: 'lpzmail@163.com',
  password: '123456'
})

const errors = ref<{
  field: string
  message: string
}[]>([])
const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  errors.value = []
  try {
    const { data } = await login(user)
    setUser(data.user)
    const redirect = (route.query.redirect || '/') as string
    router.push(redirect)
  } catch (error: unknown) {
    const err = error as { response: AxiosResponse }
    if (err.response?.status === 422) {
      errors.value = err.response.data.detail
    }
  } finally {
    isLoading.value = false
  }
}
</script>
