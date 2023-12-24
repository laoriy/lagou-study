import {
    getCommentsFromArticle,
    type ArticleComment,
    postComment,
    deleteComment,
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

    const handleDeleteComment = async (commentId: string) => {
        await deleteComment(slug, commentId)
        getComment()
    }

    return {
        comments,
        comment,
        getComment,
        handlePostComment,
        handleDeleteComment,
    }
}

export default useComment
