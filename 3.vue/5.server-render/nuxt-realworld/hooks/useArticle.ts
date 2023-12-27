import {
    createArticle,
    updateArticle,
    type PostArticle,
    deleteArticle,
} from "~/service/article"
import useError from "./useError"
function useArticle() {
    const { errors, setErrors } = useError()
    const router = useRouter()
    const article = ref<PostArticle>({
        title: "",
        description: "",
        body: "",
        tagList: [],
    })
    const tag = ref("")

    const handleCreateArticle = async () => {
        const { data, error } = await createArticle(article.value)
        if (setErrors(error)) return
        router.push(`/article/${data.value.article.slug}`)
    }
    const handleUpdateArticle = async (slug: string) => {
        const { error, data } = await updateArticle(slug, article.value)
        if (setErrors(error)) return
        router.push(`/article/${data.value.article.slug}`)
    }
    const handleDeleteArticle = async (slug: string) => {
        await deleteArticle(slug)
    }

    const handleAddTag = () => {
        if (!tag.value) return
        const newTags = Array.from(
            new Set([...article.value.tagList, tag.value])
        )
        article.value.tagList = newTags
        tag.value = ""
    }

    const handleDeleteTag = (index: number) => {
        article.value.tagList.splice(index, 1)
    }

    return {
        article,
        errors,
        tag,
        handleCreateArticle,
        handleUpdateArticle,
        handleDeleteArticle,
        handleAddTag,
        handleDeleteTag,
    }
}

export default useArticle
