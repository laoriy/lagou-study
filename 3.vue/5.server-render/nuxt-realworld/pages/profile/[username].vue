<template>
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="profile.image" class="user-img" />
                        <h4>{{ profile.username }}</h4>
                        <p>
                            {{ profile.bio }}
                        </p>
                        <button
                            v-if="params.username !== userInfo.username"
                            class="btn btn-sm btn-outline-secondary action-btn"
                            @click="handleFollowAnUser(profile)"
                        >
                            <i
                                v-if="!profile.following"
                                class="ion-plus-round"
                            ></i>
                            &nbsp;
                            {{ profile.following ? "Unfollow" : "Follow" }}
                            {{ params.username }}
                        </button>
                        <button
                            @click="handleEditProfile"
                            v-else
                            class="btn btn-sm btn-outline-secondary action-btn"
                        >
                            <i class="ion-gear-a"></i>
                            &nbsp; Edit Profile Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="articles-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    :class="{
                                        active:
                                            userArticleTab ===
                                            UserArticleTab.MY_ARTICLES,
                                    }"
                                    href="javascript:void(0)"
                                    @click="getArticlesByUsername(username)"
                                    >My Articles</a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    :class="{
                                        active:
                                            userArticleTab ===
                                            UserArticleTab.FAVORITED_ARTICLES,
                                    }"
                                    href="javascript:void(0)"
                                    @click="
                                        getFavoritedArticlesByUsername(username)
                                    "
                                    >Favorited Articles</a
                                >
                            </li>
                        </ul>
                    </div>

                    <!-- <div class="article-preview">
                        <div class="article-meta">
                            <a href="/profile/eric-simons"
                                ><img src="http://i.imgur.com/Qr71crq.jpg"
                            /></a>
                            <div class="info">
                                <a href="/profile/eric-simons" class="author"
                                    >Eric Simons</a
                                >
                                <span class="date">January 20th</span>
                            </div>
                            <button
                                class="btn btn-outline-primary btn-sm pull-xs-right"
                            >
                                <i class="ion-heart"></i> 29
                            </button>
                        </div>
                        <a
                            href="/article/how-to-buil-webapps-that-scale"
                            class="preview-link"
                        >
                            <h1>How to build webapps that scale</h1>
                            <p>This is the description for the post.</p>
                            <span>Read more...</span>
                            <ul class="tag-list">
                                <li class="tag-default tag-pill tag-outline">
                                    realworld
                                </li>
                                <li class="tag-default tag-pill tag-outline">
                                    implementations
                                </li>
                            </ul>
                        </a>
                    </div> -->

                    <!-- <div class="article-preview">
                        <div class="article-meta">
                            <a href="/profile/albert-pai"
                                ><img src="http://i.imgur.com/N4VcUeJ.jpg"
                            /></a>
                            <div class="info">
                                <a href="/profile/albert-pai" class="author"
                                    >Albert Pai</a
                                >
                                <span class="date">January 20th</span>
                            </div>
                            <button
                                class="btn btn-outline-primary btn-sm pull-xs-right"
                            >
                                <i class="ion-heart"></i> 32
                            </button>
                        </div>
                        <a href="/article/the-song-you" class="preview-link">
                            <h1>
                                The song you won't ever stop singing. No matter
                                how hard you try.
                            </h1>
                            <p>This is the description for the post.</p>
                            <span>Read more...</span>
                            <ul class="tag-list">
                                <li class="tag-default tag-pill tag-outline">
                                    Music
                                </li>
                                <li class="tag-default tag-pill tag-outline">
                                    Song
                                </li>
                            </ul>
                        </a>
                    </div>

                    <ul class="pagination">
                        <li class="page-item active">
                            <a class="page-link" href="">1</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="">2</a>
                        </li>
                    </ul> -->
                    <ArticleList
                        :articles="articles"
                        :total="paginationCount"
                        :page="page"
                        @pagination-change="handlePaginationChange"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getProfileByUsername, type Profile } from "~/service/profile"
import useFollow from "~/hooks/useFollow"
import useArticles, { UserArticleTab } from "~/hooks/useArticles"

definePageMeta({
    middleware: ["auth"],
})
const { userInfo } = userStore()
const {
    userArticleTab,
    getArticlesByUsername,
    getFavoritedArticlesByUsername,
    articles,
    page,
    paginationCount,
    handlePaginationChange,
} = useArticles()
const profile = ref<Profile>({})
const { params } = useRoute()
const username = ref(params.username as string)
const router = useRouter()
const { handleFollowAnUser } = useFollow()

const handleEditProfile = () => {
    router.push(`/settings`)
}

const getProfile = async () => {
    const { data } = await getProfileByUsername(username.value)
    profile.value = data.value.profile
}

getProfile()
getArticlesByUsername(username.value)
</script>

<style scoped></style>
