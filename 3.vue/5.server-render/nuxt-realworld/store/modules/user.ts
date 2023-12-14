type UserInfo = {
    username?: string
    bio?: string
    image?: string
    token?: string
    email?: string
}

const useStore = defineStore("user", {
    state: () => ({ userInfo: {} as UserInfo }),
})


export { useStore }
