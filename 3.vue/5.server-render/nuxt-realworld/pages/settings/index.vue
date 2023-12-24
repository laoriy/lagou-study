<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>

                    <Errors :errors="errors" />

                    <form @submit.prevent="handleUpdateUser">
                        <fieldset>
                            <fieldset class="form-group">
                                <input
                                    v-model="userInfo.image"
                                    class="form-control"
                                    type="text"
                                    placeholder="URL of profile picture"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    v-model="userInfo.username"
                                    class="form-control form-control-lg"
                                    type="text"
                                    placeholder="Your Name"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea
                                    v-model="userInfo.bio"
                                    class="form-control form-control-lg"
                                    rows="8"
                                    placeholder="Short bio about you"
                                ></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    v-model="userInfo.email"
                                    class="form-control form-control-lg"
                                    type="text"
                                    placeholder="Email"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    v-model="password"
                                    class="form-control form-control-lg"
                                    type="password"
                                    placeholder="New Password"
                                />
                            </fieldset>
                            <button
                                class="btn btn-lg btn-primary pull-xs-right"
                            >
                                Update Settings
                            </button>
                        </fieldset>
                    </form>
                    <hr />
                    <button
                        @click="handleLogout"
                        class="btn btn-outline-danger"
                    >
                        Or click here to logout.
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getUser, updateUser } from "~/service/user"

definePageMeta({
    middleware: ["auth"],
})
const router = useRouter()
const { setUser } = userStore()
const password = ref("")
const errors = ref({})

const userInfo = ref<UserInfo>({
    username: "",
    bio: "",
    image: "",
    email: "",
})

const handleUpdateUser = async () => {
    const d = { ...userInfo.value }
    if (password.value) {
        d.password = password.value
    }
    const { data, error } = await updateUser(d)
    if (error.value) {
        errors.value = error.value?.data.errors
    } else {
        setUser(data.value.user)
    }
}

const handleLogout = () => {
    setUser(null as unknown as UserInfo)
    router.push("/login")
}

const { data } = await getUser()

userInfo.value = data.value.user
</script>

<style scoped></style>
