export type Search = {
    results: [
        {
            id: number,
            title: string,
            name: string,
            poster_path: string
        }
    ] | []
    total_pages: number,
    total_results: number
}
