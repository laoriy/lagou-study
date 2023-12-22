import {
    getCommentsFromArticle,
    type ArticleComment,
    postComment,
} from "~/service/comment"

function useComment(slug: string) {
    const comments = ref<ArticleComment[]>([])
    const comment = ref("")

    const getComment = async (watching = false) => {
        const { data } = await getCommentsFromArticle(slug)

        comments.value = data.value?.comments || []
        watching &&
            watch(data, (newData) => {
                comments.value = newData?.comments || []
            })
    }

    const handlePostComment = async (body: string) => {
        if (!body) return
        await postComment(slug, body.trim())
        getComment()
        comment.value = ""
    }

    return { comments, comment, getComment, handlePostComment }
}

export default useComment
