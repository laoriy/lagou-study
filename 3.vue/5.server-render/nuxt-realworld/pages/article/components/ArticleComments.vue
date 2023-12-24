<template>
    <form
        v-if="userInfo"
        class="card comment-form"
        @submit.prevent="handlePostComment(comment)"
    >
        <div class="card-block">
            <textarea
                v-model="comment"
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
            <span
                v-if="userInfo?.username === comment.author.username"
                @click="handleDeleteComment(comment.id)"
                class="mod-options"
            >
                <i class="ion-trash-a"></i>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import useComment from "~/hooks/useComment"

const props = defineProps({
    slug: {
        type: String,
        required: true,
    },
})

const {
    comments,
    comment,
    handlePostComment,
    handleDeleteComment,
    getComment,
} = useComment(props.slug)

const { userInfo } = userStore()

getComment(true)
</script>

<style scoped></style>
