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
                        <li>That email is already taken</li>
                    </ul>

                    <form>
                        <fieldset v-if="!isLogin" class="form-group">
                            <input
                                class="form-control form-control-lg"
                                type="text"
                                placeholder="Username"
                            />
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                class="form-control form-control-lg"
                                type="text"
                                placeholder="Email"
                            />
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                class="form-control form-control-lg"
                                type="password"
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
defineProps({
    isLogin: {
        type: Boolean,
        default: false,
    },
})
</script>

<style scoped></style>
