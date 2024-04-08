import axios from "axios"
import { create } from "zustand"

const useAuthStore = create<{
  success: boolean
  user?: any
  errors?: any
  login: (payload: any) => void
  loadUser: (token: string) => void
}>(set => ({
  success: false,
  login: async (payload: any) => {
    try {
      let { data } = await axios.post("/users/login", payload)
      localStorage.setItem("token", data.user.token)
      set({ success: true, user: data.user })
    } catch (ex: any) {
      const errors = ex.response.data.errors
      const message = []
      for (let attr in errors) {
        for (let i = 0; i < errors[attr].length; i++) {
          message.push(`${attr} ${errors[attr][i]}`)
        }
      }
      set({ success: false, errors: message })
    }
  },
  loadUser: async (token: string) => {
    let { data } = await axios.get("/user", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    set({ user: data.user, success: true })
  },
}))

export { useAuthStore }
