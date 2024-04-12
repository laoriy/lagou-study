import axios from "axios"
import { create } from "zustand"

const useArticleStore = create<{
  articles: any[]
  loadArticles: (params: { limit: number; offset: number }) => void
}>(set => ({
  articles: null,
  async loadArticles({ limit, offset }) {
    let { data } = await axios.get("/articles", {
      params: { limit, offset },
    })
    set({ articles: data.articles })
  },
}))

export { useArticleStore }
