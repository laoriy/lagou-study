import type { Profile } from "./profile"

interface BaseListParams {
    limit?: number
    offset?: number
}

interface FetchArticleParams extends BaseListParams {
    tag?: string
    author?: string
    favorited?: string
}
type Author = Profile
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

type PostArticle = {
    title: string
    description: string
    body: string
    tagList: string[]
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

function createArticle(article: PostArticle) {
    return post<{ article: Article }>("/articles", { body: { article } })
}
function updateArticle(slug: string, article: PostArticle) {
    return put<{ article: Article }>(`/articles/${slug}`, { body: { article } })
}

function deleteArticle(slug: string) {
    return deleteApi(`/articles/${slug}`)
}

export {
    getGlobalArticles,
    getFeedArticles,
    getArticleDetail,
    createArticle,
    updateArticle,
    deleteArticle,
}
export type {
    BaseListParams,
    FetchArticleParams,
    Article,
    PartialArticle,
    Author,
    PostArticle,
}
