import { post } from "~/utils/request"

interface LoginParams {
    email: string
    password: string
}

function login(params: LoginParams) {
    return post("/users/login", { body: { user: params } })
}

export { login }
export type { LoginParams }
