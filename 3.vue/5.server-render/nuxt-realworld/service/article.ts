interface FetchArticleParams {
    tag?: string
    author?: string
    favorited?: string
    limit?: number
    offset?: number
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

function getAllTags() {
    return get<{ tags: string[] }>("/tags")
}

export { getGlobalArticles, getAllTags }
export type { FetchArticleParams, Article }
