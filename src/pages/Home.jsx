import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/movieSlice";
import Card from "../component/Card"; 

function Home() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies()); 
  }, [dispatch]);

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  return (
    <div className="bg-black min-h-screen  py-8 px-4">

      {loading && <p className="text-center text-white text-xl">Loading...</p>}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      <div className="grid grid-cols-2  pt-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 px-4">
        {movies?.map((movie) => (
          <Card 
           slug={generateSlug(movie.title)} 
            key={movie.id} 
            Name={movie.title} 
            Image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
