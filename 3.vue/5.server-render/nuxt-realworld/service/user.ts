import { post } from "~/utils/request"

interface LoginParams {
    email: string
    password: string
}

interface RegisterParams extends LoginParams {
    username: string
}


function login(params: LoginParams) {
    return post<{ user: UserInfo }>("/users/login", { body: { user: params } })
}

function register(params: RegisterParams) {
    return post<{ user: UserInfo }>("/users", { body: { user: params } })
}

export { login, register }
export type { LoginParams, RegisterParams }
