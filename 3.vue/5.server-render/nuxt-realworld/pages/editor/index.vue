<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <Errors :errors="errors" />

                    <form>
                        <fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control form-control-lg"
                                    placeholder="Article Title"
                                    v-model="article.title"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="What's this article about?"
                                    v-model="article.description"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea
                                    class="form-control"
                                    rows="8"
                                    placeholder="Write your article (in markdown)"
                                    v-model="article.body"
                                ></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter tags"
                                    v-model="tag"
                                    @keyup.enter="handleAddTag()"
                                />
                                <div class="tag-list">
                                    <span
                                        v-for="(tag, index) in article.tagList"
                                        class="tag-default tag-pill"
                                    >
                                        <i
                                            class="ion-close-round"
                                            @click="handleDeleteTag(index)"
                                        ></i>
                                        {{ tag }}
                                    </span>
                                </div>
                            </fieldset>
                            <button
                                @click="
                                    slug
                                        ? handleUpdateArticle(slug)
                                        : handleCreateArticle()
                                "
                                class="btn btn-lg pull-xs-right btn-primary"
                                type="button"
                            >
                                {{ slug ? "Update" : "Publish" }} Article
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useArticle from "~/hooks/useArticle"
import { getArticleDetail } from "~/service/article"

definePageMeta({
    middleware: ["auth"],
})

const { query } = useRoute()
const slug = query.slug as string
const {
    handleCreateArticle,
    handleUpdateArticle,
    handleAddTag,
    handleDeleteTag,
    article,
    errors,
    tag,
} = useArticle()

if (slug) {
    const { data } = await getArticleDetail(slug as string)
    if (data.value) {
        article.value = {
            title: data.value.article.title,
            description: data.value.article.description,
            body: data.value.article.body,
            tagList: data.value.article.tagList,
        }
    }
}
</script>

<style scoped></style>
