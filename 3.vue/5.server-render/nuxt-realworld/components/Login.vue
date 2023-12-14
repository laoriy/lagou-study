<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">
                        {{ isLogin ? "Sign in" : "Sign up" }}
                    </h1>
                    <p class="text-xs-center">
                        <NuxtLink v-if="isLogin" href="/register"
                            >Need an account?</NuxtLink
                        >
                        <NuxtLink v-else href="/login"
                            >Have an account?</NuxtLink
                        >
                    </p>

                    <ul class="error-messages">
                        <template
                            v-for="(messages, field) in errors"
                            :key="field"
                        >
                            <li
                                v-for="(message, index) in messages"
                                :key="index"
                            >
                                {{ field }} {{ message }}
                            </li>
                        </template>
                    </ul>

                    <form @submit.prevent="handleSubmit">
                        <fieldset v-if="!isLogin" class="form-group">
                            <input
                                v-model="username"
                                class="form-control form-control-lg"
                                type="text"
                                placeholder="Username"
                            />
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                v-model="user.email"
                                class="form-control form-control-lg"
                                type="email"
                                placeholder="Email"
                                required
                            />
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                v-model="user.password"
                                class="form-control form-control-lg"
                                type="password"
                                required
                                placeholder="Password"
                            />
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            {{ isLogin ? "Sign in" : "Sign up" }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    isLogin: {
        type: Boolean,
        default: false,
    },
    errors: {
        type: Object,
        default: () => ({}),
    },
})
const emit = defineEmits(["submit"])

const username = ref("")
const user = reactive({
    email: "",
    password: "",
})

const handleSubmit = () => {
    if (!props.isLogin) {
        // 注册
        emit("submit", { ...toRaw(user), username: username.value })
    } else {
        // 登录
        emit("submit", toRaw(user))
    }
}
</script>

<style scoped></style>
