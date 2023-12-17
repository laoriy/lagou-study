import { getGlobalArticles, getAllTags } from "~/service/article"
import type { Article, FetchArticleParams } from "~/service/article"

const enum FeedType {
    Global = "global",
    MyFeed = "my_feed",
    Tag = "tag",
}

const useArticles = () => {
    const { userInfo } = userStore()

    const articles = ref([] as Article[])
    const articlesCount = ref(0)
    const tags = ref([] as string[])
    const currentTag = ref("")
    const feedType = ref(FeedType.Global)

    const limit = ref(10)
    const page = ref(1)
    const paginationCount = computed(() =>
        Math.ceil(articlesCount.value / limit.value)
    )
    /**获取文章列表 */
    const getArticles = async (p: FetchArticleParams = {}) => {
        const query: FetchArticleParams = {
            offset: limit.value * (page.value - 1),
            limit: limit.value,
            ...p,
        }
        const { data } = await getGlobalArticles(query)
        articles.value = data.value.articles
        articlesCount.value = data.value.articlesCount
    }
    /**获取所有标签 */
    const getTags = async () => {
        const { data } = await getAllTags()
        tags.value = data.value.tags
    }
    /** 分页变化*/
    const handlePaginationChange = (_page: number) => {
        page.value = _page
        getArticles()
    }

    const handleTag = (tag: string) => {
        feedType.value = FeedType.Tag
        currentTag.value = tag
        page.value = 1
        getArticles({ tag })
    }
    const handleGlobalFeed = () => {
        feedType.value = FeedType.Global
        currentTag.value = ""
        page.value = 1
        getArticles()
    }

    const handleMyFeed = () => {
        feedType.value = FeedType.MyFeed
        currentTag.value = ""
        page.value = 1
        getArticles({ author: userInfo.username })
    }

    return {
        articles,
        tags,
        articlesCount,
        page,
        paginationCount,
        currentTag,
        feedType,
        getArticles,
        getTags,
        handleTag,
        handleGlobalFeed,
        handleMyFeed,
        handlePaginationChange,
    }
}

export { FeedType }
export default useArticles
