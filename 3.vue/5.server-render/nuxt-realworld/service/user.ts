import { post, put } from "~/utils/request"

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

function updateUser(params: UserInfo) {
    return put<{ user: UserInfo }>("/user", { body: { user: params } })
}

function getUser() {
    return get<{ user: UserInfo }>("/user")
}

export { login, register, updateUser, getUser }
export type { LoginParams, RegisterParams }
