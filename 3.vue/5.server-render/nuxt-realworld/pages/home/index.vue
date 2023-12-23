<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit1</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>

        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item" v-if="token">
                                <a
                                    class="nav-link"
                                    href="javascript:void(0)"
                                    :class="{
                                        active: feedTab === FeedTab.MyFeed,
                                    }"
                                    @click="handleMyFeed"
                                    >Your Feed</a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    :class="{
                                        active: feedTab === FeedTab.Global,
                                    }"
                                    href="javascript:void(0)"
                                    @click="handleGlobalFeed"
                                    >Global Feed</a
                                >
                            </li>
                            <li v-if="currentTag" class="nav-item">
                                <a
                                    class="nav-link ion-pound active"
                                    href="javascript:void(0)"
                                >
                                    &nbsp;{{ currentTag }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div
                        v-for="article in articles"
                        :key="article.slug"
                        class="article-preview"
                    >
                        <div class="article-meta">
                            <NuxtLink
                                :to="`/profile/${article.author.username}`"
                            >
                                <img :src="article.author.image"
                            /></NuxtLink>
                            <div class="info">
                                <NuxtLink
                                    :to="`/profile/${article.author.username}`"
                                    class="author"
                                    >{{ article.author.username }}</NuxtLink
                                >
                                <span class="date">{{
                                    dateFormat(
                                        article.createdAt,
                                        "MMMM D, YYYY"
                                    )
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
                        <NuxtLink
                            :to="`/article/${article.slug}`"
                            class="preview-link"
                        >
                            <h1>{{ article.title }}</h1>
                            <p>{{ article.description }}</p>
                            <span>Read more...</span>
                            <ul
                                v-for="tag in article.tagList"
                                :key="tag"
                                class="tag-list"
                            >
                                <li class="tag-default tag-pill tag-outline">
                                    {{ tag }}
                                </li>
                            </ul>
                        </NuxtLink>
                    </div>
                    <ul class="pagination">
                        <li
                            v-for="p in paginationCount"
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
                </div>
                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>

                        <div class="tag-list">
                            <a
                                v-for="tag in tags"
                                :key="tag"
                                href="javascript:void(0)"
                                class="tag-pill tag-default"
                                @click="handleTag(tag)"
                                >{{ tag }}</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useArticles from "~/hooks/useArticles"
import useFavorite from "~/hooks/useFavorite"
import { FeedTab } from "~/hooks/useArticles"
const { token } = userStore()
const {
    articles,
    tags,
    currentTag,
    page,
    paginationCount,
    feedTab,
    getArticles,
    getTags,
    handleGlobalFeed,
    handleMyFeed,
    handleTag,
    handlePaginationChange,
} = useArticles()

const { handleFavoriteArticle } = useFavorite()
await Promise.all([getArticles(), getTags()]) // 这里必须加await  否则会保持 Hydration node mismatch. 因为服务端没拿到数据时生成的DOM和最终客户端要显示的模板肯定不一样DOM
</script>

<style scoped></style>
