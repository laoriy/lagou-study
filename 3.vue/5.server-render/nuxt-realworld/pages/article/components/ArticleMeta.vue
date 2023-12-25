<template>
    <div class="article-meta">
        <NuxtLink :to="`/profile/${article.author?.username}`"
            ><img src="http://i.imgur.com/Qr71crq.jpg"
        /></NuxtLink>
        <div class="info">
            <NuxtLink
                :to="`/profile/${article.author?.username}`"
                class="author"
                >{{ article.author?.username }}</NuxtLink
            >
            <span class="date">{{
                dateFormat(article.createdAt, "MMMM D, YYYY")
            }}</span>
        </div>

        <template v-if="article.author?.username === userInfo?.username">
            <button class="btn btn-sm btn-outline-secondary">
                <i class="ion-edit"></i> Edit Article
            </button>
            <button class="btn btn-sm btn-outline-danger">
                <i class="ion-trash-a"></i> Delete Article
            </button>
        </template>
        <template v-else>
            <button
                class="btn btn-sm btn-outline-secondary"
                :class="{ active: article.author?.following }"
                @click="handleFollowAnUser(article.author!)"
            >
                <i class="ion-plus-round" v-if="!article.author?.following"></i>
                &nbsp; {{ article.author?.following ? "Unfollow" : "Follow" }} {{ article.author?.username }}
                <!-- <span class="counter">({{ article.favoritesCount }})</span> -->
            </button>
            &nbsp;&nbsp;
            <button
                class="btn btn-sm btn-outline-primary"
                :class="{ active: article.favorited }"
                @click="handleFavoriteArticle(article as Article)"
            >
                <i class="ion-heart"></i>
                &nbsp; Favorite Post
                <span class="counter">({{ article.favoritesCount }})</span>
            </button>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue"
import useFavorite from "~/hooks/useFavorite"
import useFollow from "~/hooks/useFollow"
import { type Article, type PartialArticle } from "~/service/article"

defineProps({
    article: {
        type: Object as PropType<PartialArticle>,
        required: true,
    },
})

const { userInfo } = userStore()
const { handleFavoriteArticle } = useFavorite()
const { handleFollowAnUser, handleUnFollowAnUser } = useFollow()
</script>

<style scoped></style>
