import { post, deleteApi } from "~/utils/request"
/** 点赞文章 */
function favoriteAnArticle(slug: string) {
    return post(`/articles/${slug}/favorite`)
}
/** 取消点赞 */
function unFavoriteAnArticle(slug: string) {
    return deleteApi(`/articles/${slug}/favorite`)
}

export { favoriteAnArticle, unFavoriteAnArticle }
