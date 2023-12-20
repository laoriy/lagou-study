import type { Author } from './article'

type ArticleComment = {
    id: string
    createdAt: string
    updatedAt: string
    body: string
    author: Author
}

function getCommentsFromArticle(slug: string) {
    return get<{ comments: ArticleComment[] }>(`/articles/${slug}/comments`, {
        server: false,
    })
}

export { getCommentsFromArticle }
export type { ArticleComment }
