import { get, post, deleteApi } from "~/utils/request"

type Profile = {
    username?: string
    bio?: string
    image?: string
    following?: boolean
}

/** 获取用户个人资料 */
function getProfileByUsername(username: string) {
    return get<{ profile: Profile }>(`/profiles/${username}`)
}
/** 关注用户 */
function followAnUser(username: string) {
    return post(`/profiles/${username}/follow`)
}
/** 取消关注 */
function unFlowAnUser(username: string) {
    return deleteApi(`/profiles/${username}/follow`)
}
export { getProfileByUsername, followAnUser, unFlowAnUser }
export type { Profile }
