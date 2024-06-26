type UserInfo = {
    username: string
    bio: string
    image: string
    token?: string
    password?: string
    email: string
}

const userStore = defineStore("user", {
    state: () => ({ userInfo: null as unknown as UserInfo }),
    getters:{
        token:(state)=> state.userInfo?.token
    },
    actions: {
        setUser(user: UserInfo) {
            this.userInfo = user 
        },
    },
    persist: true,
})
export type { UserInfo }
export { userStore }
