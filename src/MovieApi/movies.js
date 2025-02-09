
export const fetchMoviesFromApi = async () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`

    try {
        const response = await fetch(URL)
        if(!response.ok){
           throw new Error("Failed to fetch movies")
        }
        const data = await response.json()
        return data.results

    } catch (error) {
        console.error("error fetching movies",error)
        throw error
    }
}

