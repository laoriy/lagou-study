interface BaseListParams {
    limit?: number
    offset?: number
}

interface FetchArticleParams extends BaseListParams {
    tag?: string
    author?: string
    favorited?: string
}
interface Author {
    username: string
    bio: string
    image: string
    following: boolean
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
    author: Author
}

type PartialArticle = Partial<Article>

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

function getArticleDetail(slug: string) {
    return get<{ article: Article }>(`/articles/${slug}`)
}

export { getGlobalArticles, getFeedArticles, getArticleDetail }
export type {
    BaseListParams,
    FetchArticleParams,
    Article,
    PartialArticle,
    Author,
}
