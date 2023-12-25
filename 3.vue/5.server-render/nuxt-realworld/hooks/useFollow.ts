import { followAnUser, unFlowAnUser, type Profile } from "~/service/profile"

function useFollow() {
    const handleFollowAnUser = async (profile: Profile) => {
        const { following, username } = profile
        if (following) {
            await unFlowAnUser(username!)
        } else {
            await followAnUser(username!)
        }
        profile.following = !profile.following
    }
    return { handleFollowAnUser }
}

export default useFollow
