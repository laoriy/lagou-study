<template>
    <div
        v-for="article in articles"
        :key="article.slug"
        class="article-preview"
    >
        <div class="article-meta">
            <NuxtLink :to="`/profile/${article.author.username}`">
                <img :src="article.author.image"
            /></NuxtLink>
            <div class="info">
                <NuxtLink
                    :to="`/profile/${article.author.username}`"
                    class="author"
                    >{{ article.author.username }}</NuxtLink
                >
                <span class="date">{{
                    dateFormat(article.createdAt, "MMMM D, YYYY")
                }}</span>
            </div>
            <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="handleFavoriteArticle(article)"
            >
                <i class="ion-heart"></i>
                {{ article.favoritesCount }}
            </button>
        </div>
        <NuxtLink :to="`/article/${article.slug}`" class="preview-link">
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
            <ul v-for="tag in article.tagList" :key="tag" class="tag-list">
                <li class="tag-default tag-pill tag-outline">
                    {{ tag }}
                </li>
            </ul>
        </NuxtLink>
    </div>
    <ul class="pagination">
        <li
            v-for="p in total"
            :key="p"
            :class="{ active: p === page }"
            class="page-item"
        >
            <a
                class="page-link"
                href="javascript:void(0)"
                @click="handlePaginationChange(p)"
                >{{ p }}</a
            >
        </li>
    </ul>
</template>

<script setup lang="ts">
import useFavorite from "~/hooks/useFavorite"
import type { Article } from "~/service/article"
const { handleFavoriteArticle } = useFavorite()

defineProps({
    articles: {
        type: Array as PropType<Article[]>,
        default: () => [],
    },
    total: {
        type: Number,
        default: 0,
    },
    page: {
        type: Number,
        default: 1,
    },
})

const emits = defineEmits(["pagination-change"])
const handlePaginationChange = (p: number) => {
    emits("pagination-change", p)
}
</script>

<style scoped></style>
