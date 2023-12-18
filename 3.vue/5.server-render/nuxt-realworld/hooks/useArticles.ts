import {
    getGlobalArticles,
    getFeedArticles,
    getAllTags,
} from "~/service/article"
import type {
    Article,
    FetchArticleParams,
    BaseListParams,
} from "~/service/article"

const enum FeedTab {
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
    const feedTab = ref(FeedTab.Global)

    const limit = ref(10)
    const page = ref(1)
    const paginationCount = computed(() =>
        Math.ceil(articlesCount.value / limit.value)
    )

    /**获取文章列表 */
    const getArticles = async (p: FetchArticleParams = {}) => {
        let query: BaseListParams = {
            offset: limit.value * (page.value - 1),
            limit: limit.value,
        }

        if (feedTab.value !== FeedTab.MyFeed) Object.assign(query, { ...p })

        const { data } =
            feedTab.value !== FeedTab.MyFeed
                ? await getGlobalArticles(query)
                : await getFeedArticles(query)
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
        feedTab.value = FeedTab.Tag
        currentTag.value = tag
        page.value = 1
        getArticles({ tag })
    }

    const handleFeed = (type: FeedTab) => {
        feedTab.value = type
        currentTag.value = ""
        page.value = 1
    }
    const handleGlobalFeed = () => {
        handleFeed(FeedTab.Global)
        getArticles()
    }

    const handleMyFeed = () => {
        handleFeed(FeedTab.MyFeed)
        getArticles({ author: userInfo.username })
    }

    return {
        articles,
        tags,
        articlesCount,
        page,
        paginationCount,
        currentTag,
        feedTab,
        getArticles,
        getTags,
        handleTag,
        handleGlobalFeed,
        handleMyFeed,
        handlePaginationChange,
    }
}

export { FeedTab }
export default useArticles
