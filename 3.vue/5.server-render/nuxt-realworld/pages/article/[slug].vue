<template>
    <div class="article-page">
        <div class="banner">
            <div class="container">
                <h1>{{ article.title }}</h1>
                <ArticleMeta :article="article"></ArticleMeta>
            </div>
        </div>

        <div class="container page">
            <div class="row article-content">
                <div class="col-md-12">
                    <div v-html="article.body"></div>
                    <ul class="tag-list">
                        <li
                            v-for="tag in article.tagList || []"
                            class="tag-default tag-pill tag-outline"
                        >
                            {{ tag }}
                        </li>
                    </ul>
                </div>
            </div>

            <hr />

            <div class="article-actions">
                <ArticleMeta :article="article"></ArticleMeta>
            </div>

            <div class="row">
                <div class="col-xs-12 col-md-8 offset-md-2">
                    <form class="card comment-form">
                        <div class="card-block">
                            <textarea
                                class="form-control"
                                placeholder="Write a comment..."
                                rows="3"
                            ></textarea>
                        </div>
                        <div class="card-footer">
                            <img
                                src="http://i.imgur.com/Qr71crq.jpg"
                                class="comment-author-img"
                            />
                            <button class="btn btn-sm btn-primary">
                                Post Comment
                            </button>
                        </div>
                    </form>

                    <div class="card">
                        <div class="card-block">
                            <p class="card-text">
                                With supporting text below as a natural lead-in
                                to additional content.
                            </p>
                        </div>
                        <div class="card-footer">
                            <a href="/profile/author" class="comment-author">
                                <img
                                    src="http://i.imgur.com/Qr71crq.jpg"
                                    class="comment-author-img"
                                />
                            </a>
                            &nbsp;
                            <a
                                href="/profile/jacob-schmidt"
                                class="comment-author"
                                >Jacob Schmidt</a
                            >
                            <span class="date-posted">Dec 29th</span>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-block">
                            <p class="card-text">
                                With supporting text below as a natural lead-in
                                to additional content.
                            </p>
                        </div>
                        <div class="card-footer">
                            <a href="/profile/author" class="comment-author">
                                <img
                                    src="http://i.imgur.com/Qr71crq.jpg"
                                    class="comment-author-img"
                                />
                            </a>
                            &nbsp;
                            <a
                                href="/profile/jacob-schmidt"
                                class="comment-author"
                                >Jacob Schmidt</a
                            >
                            <span class="date-posted">Dec 29th</span>
                            <span class="mod-options">
                                <i class="ion-trash-a"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getArticleDetail, type PartialArticle } from "~/service/article"
import MarkdownIt from "markdown-it"
import ArticleMeta from "./components/ArticleMeta.vue"

const { slug } = useRoute().params
const md = new MarkdownIt()
const article = ref<PartialArticle>({})
const { data } = await getArticleDetail(slug as string)
data.value.article.body = md.render(data.value.article.body)

article.value = data.value.article

useSeoMeta({ title: article.value.title })
</script>

<style scoped></style>
