import { getGlobalArticles, getFeedArticles } from "~/service/article"
import type {
    Article,
    FetchArticleParams,
    BaseListParams,
} from "~/service/article"
import { getAllTags } from "~/service/tag"

const enum FeedTab {
    Global = "global",
    MyFeed = "my_feed",
    Tag = "tag",
}

const enum UserArticleTab {
    MY_ARTICLES = "MY_ARTICLES",
    FAVORITED_ARTICLES = "FAVORITED_ARTICLES",
}

const useArticles = () => {
    const { userInfo } = userStore()

    const articles = ref([] as Article[])
    const articlesCount = ref(0)
    const tags = ref([] as string[])
    const currentTag = ref("")
    const feedTab = ref(FeedTab.Global)
    const userArticleTab = ref(UserArticleTab.MY_ARTICLES)
    // for execatly user
    const author = ref("")
    const favorited = ref("")

    const limit = ref(5)
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

        if (author.value) Object.assign(query, { author: author.value })
        if (favorited.value)
            Object.assign(query, { favorited: favorited.value })

        const { data } =
            feedTab.value !== FeedTab.MyFeed
                ? await getGlobalArticles(query)
                : await getFeedArticles(query)
        articles.value = data.value.articles || []
        articlesCount.value = data.value.articlesCount || 0
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

    const getArticlesByUsername = (username: string) => {
        author.value = username
        favorited.value = ""
        userArticleTab.value = UserArticleTab.MY_ARTICLES
        getArticles()
    }
    const getFavoritedArticlesByUsername = (username: string) => {
        favorited.value = username
        author.value = ""
        userArticleTab.value = UserArticleTab.FAVORITED_ARTICLES
        getArticles()
    }

    return {
        articles,
        tags,
        articlesCount,
        page,
        paginationCount,
        currentTag,
        feedTab,
        userArticleTab,
        getArticles,
        getTags,
        handleTag,
        handleGlobalFeed,
        handleMyFeed,
        handlePaginationChange,
        getArticlesByUsername,
        getFavoritedArticlesByUsername,
    }
}

export { FeedTab, UserArticleTab }
export default useArticles
