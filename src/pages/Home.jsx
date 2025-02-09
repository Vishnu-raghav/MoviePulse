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

  return (
    <div className="bg-black min-h-screen py-8 px-2 sm:px-4 lg:px-10">
      {loading && <p className="text-center text-white text-xl font-semibold">Loading...</p>}
      {error && <p className="text-center text-red-500 text-lg font-bold">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pt-16">
        {movies?.map((movie) => (
          <Card 
            key={movie.id} 
            Name={movie.title} 
            Image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            movieId={movie.id} 
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

