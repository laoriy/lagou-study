import type { Author } from "./article"

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

function postComment(slug: string, body: string) {
    return post(`/articles/${slug}/comments`, {
        body: {
            comment: {
                body,
            },
        },
    })
}

export { getCommentsFromArticle, postComment }
export type { ArticleComment }
