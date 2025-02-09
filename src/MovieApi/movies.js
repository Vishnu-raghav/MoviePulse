
export const fetchMoviesFromApi = async () => {
    const API_KEY = "4ef731e3bc88e84e4a355c9a8157780c"
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

