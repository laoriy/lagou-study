const BASE_URL = "https://api.realworld.io/api"

const request =
    (method: "get" | "post" | "put" | "delete" = "get") =>
    async <T>(url: string, options: Parameters<typeof useFetch>["1"] = {}) => {
        const response = await useFetch(url, {
            baseURL: BASE_URL,
            method,
            watch: false,
            ...options,
        })
        return response
    }

const get = request("get")
const post = request("post")

export { get, post }
