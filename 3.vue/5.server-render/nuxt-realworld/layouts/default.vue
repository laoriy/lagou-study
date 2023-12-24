<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <NuxtLink class="navbar-brand" to="/">laoriy conduit</NuxtLink>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item" v-for="c in configPath" :key="c.name">
                    <NuxtLink class="nav-link" :to="c.path">
                        <template v-if="c.icon"
                            ><i :class="[c.icon]"></i>&nbsp;</template
                        >
                        {{ c.name }}</NuxtLink
                    >
                </li>
                <li v-if="token" class="nav-item">
                    <NuxtLink class="nav-link" :to="`/profile/${userInfo.username}`">
                        <img :src="userInfo.image" class="user-pic" />
                        {{ userInfo.username }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </nav>
    <slot><router-view /></slot>
    <footer>
        <div class="container">
            <NuxtLink to="/" class="logo-font">conduit</NuxtLink>
            <span class="attribution">
                An interactive learning project from
                <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
                licensed under MIT.
            </span>
        </div>
    </footer>
</template>

<script setup lang="ts">
type Path = {
    path: string
    name: string
    icon?: string
}

const { token, userInfo } = storeToRefs(userStore())

const basePaths = [
    {
        path: "/",
        name: "Home",
    },
]
const unLoginPaths = [
    {
        path: "/login",
        name: "Sign in",
    },
    {
        path: "/register",
        name: "Sign up",
    },
]

const loginedPaths = [
    {
        path: "/editor",
        name: "New Article",
        icon: "ion-compose",
    },
    {
        path: "/settings",
        name: "Settings",
        icon: "ion-gear-a",
    },
]
const configPath = computed<Path[]>(() => [
    ...basePaths,
    ...(token.value ? loginedPaths : unLoginPaths),
])

const route = useRoute()
</script>

<style scoped></style>
