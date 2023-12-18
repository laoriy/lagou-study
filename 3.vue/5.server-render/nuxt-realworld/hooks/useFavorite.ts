import type { Article } from "~/service/article"
import { favoriteAnArticle, unFavoriteAnArticle } from "~/service/favorite"

function useFavorite() {
    const handleFavoriteArticle = async (article: Article) => {
        const { slug, favorited } = article
        if (favorited) {
            await unFavoriteAnArticle(slug)
        } else {
            await favoriteAnArticle(slug)
        }
        article.favorited = !favorited
        article.favoritesCount += favorited ? -1 : 1
    }
    return { handleFavoriteArticle }
}

export default useFavorite
