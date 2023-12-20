<template>
    <form class="card comment-form">
        <div class="card-block">
            <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
            ></textarea>
        </div>
        <div class="card-footer">
            <img :src="userInfo.image" class="comment-author-img" />
            <button class="btn btn-sm btn-primary">Post Comment</button>
        </div>
    </form>

    <div v-for="comment in comments" class="card">
        <div class="card-block">
            <p class="card-text">
                {{ comment.body }}
            </p>
        </div>
        <div class="card-footer">
            <NuxtLink
                :to="'/profile/' + comment.author.username"
                class="comment-author"
            >
                <img :src="comment.author.image" class="comment-author-img" />
            </NuxtLink>
            &nbsp;
            <NuxtLink
                :to="'/profile/' + comment.author.username"
                class="comment-author"
                >{{ comment.author.username }}</NuxtLink
            >
            <span class="date-posted">{{
                dateFormat(comment.createdAt, "MMMM D, YYYY")
            }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Author } from "~/service/article"
import { type ArticleComment, getCommentsFromArticle } from "~/service/comment"

const props = defineProps({
    slug: {
        type: String,
        required: true,
    },
})

const comments = ref<ArticleComment[]>([])
const { userInfo } = userStore()

const { data } = await getCommentsFromArticle(props.slug)
comments.value = data.value?.comments || []

watch(data, (newData) => {
    comments.value = newData?.comments || []
})
</script>

<style scoped></style>
