function getAllTags() {
    return get<{ tags: string[] }>("/tags")
}
export { getAllTags }
