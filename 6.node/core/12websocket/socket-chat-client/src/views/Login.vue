<template>
  <h1>用户登录</h1>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="">用户名</label>
      <input v-model="user.username" type="text">
    </div>
    <div>
      <label for="">密码</label>
      <input v-model="user.password" type="text">
    </div>
    <div>
      <button>登录/注册</button>
    </div>
  </form>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const router = useRouter()
    const store = useStore()

    const user = reactive({
      username: '',
      password: ''
    })
    const handleSubmit = async () => {
      try {
        const { data } = await axios.post('http://localhost:3000/api/login', user)
        store.commit('setUser', data)
        console.log(data)
        router.push('/')
      } catch (err) {
        window.alert(err.message)
      }
    }
    return {
      user,
      handleSubmit
    }
  }
})
</script>

<style>

</style>
