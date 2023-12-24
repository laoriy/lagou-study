import type { _AsyncData } from "nuxt/dist/app/composables/asyncData"

const BASE_URL = "https://api.realworld.io/api"

const request =
    (method: "get" | "post" | "put" | "delete" = "get") =>
    async <T = any, F = any>(
        url: string,
        options: Parameters<typeof useFetch>["1"] = {}
    ) => {
        const { token } = userStore()
        const response = await useFetch(url, {
            baseURL: BASE_URL,
            method,
            watch: false,
            ...options,
            headers: {
                Authorization: token ? `Token ${token}` : "",
                ...(options.headers || {}),
            },
        })

        return response as _AsyncData<T, F>
    }

const get = request("get")
const post = request("post")
const deleteApi = request("delete")
const put = request("put")

export { get, post, put, deleteApi }
