import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../component/Card";

function SearchResults() {
  const { query } = useParams(); // ✅ Get search term from URL
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4ef731e3bc88e84e4a355c9a8157780c&query=${query}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching search results:", error));
  }, [query]);
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h1>
      
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            
            <Card 
              key={movie.id} 
              slug={generateSlug(movie.title)} 
              Name={movie.title} 
              Image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            />
          
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;
