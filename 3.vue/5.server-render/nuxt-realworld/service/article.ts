interface BaseListParams {
    limit?: number
    offset?: number
}

interface FetchArticleParams extends BaseListParams {
    tag?: string
    author?: string
    favorited?: string
}

interface Article {
    slug: string
    title: string
    description: string
    body: string
    tagList: string[]
    createdAt: string
    updatedAt: string
    favorited: boolean
    favoritesCount: number
    author: {
        username: string
        bio: string
        image: string
        following: boolean
    }
}

type ArticleData = {
    articles: Article[]
    articlesCount: number
}

/**获取公共文章列表 */
function getGlobalArticles(query: FetchArticleParams = {}) {
    return get<ArticleData>("/articles", { query: query })
}

function getFeedArticles(query: BaseListParams) {
    return get<ArticleData>("/articles/feed", { query: query })
}

function getAllTags() {
    return get<{ tags: string[] }>("/tags")
}

export { getGlobalArticles, getFeedArticles, getAllTags }
export type { BaseListParams, FetchArticleParams, Article }
