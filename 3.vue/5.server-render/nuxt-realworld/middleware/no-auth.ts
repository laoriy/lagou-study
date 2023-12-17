export default defineNuxtRouteMiddleware(() => {
    const { token } = userStore()

    if (token) {
        return navigateTo("/", { replace: true })
    }
})
