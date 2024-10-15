import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/api/user'
// 声明 State 类型

export const useUserStore = defineStore('user', () => {
  const storeUser = ref<User>(
    JSON.parse(window.localStorage.getItem('user') || 'null'),
  )

  function setUser(newUser: User) {
    storeUser.value = newUser
    window.localStorage.setItem('user', JSON.stringify(newUser))
  }

  return { storeUser, setUser }
})
