import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MoviePage() {
  const { slug } = useParams();
  const { movies } = useSelector((state) => state.movies);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    let foundMovie = movies.find(
      (m) => m.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
    );

    if (foundMovie) {
      setMovie(foundMovie);
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=4ef731e3bc88e84e4a355c9a8157780c&query=${slug}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.results.length > 0) {
            setMovie(data.results[0]); 
          }
        })
        .catch((error) => console.error("Error fetching movie details:", error));
    }
  }, [slug, movies]);

  useEffect(() => {
    if (movie) {
      
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=4ef731e3bc88e84e4a355c9a8157780c`
      )
        .then((res) => res.json())
        .then((data) => setCast(data.cast.slice(0, 8)))
        .catch((error) => console.error("Error fetching cast:", error));

      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=4ef731e3bc88e84e4a355c9a8157780c`
      )
        .then((res) => res.json())
        .then((data) => {
          const officialTrailer = data.results.find(
            (video) => video.type === "Trailer"
          );
          if (officialTrailer) {
            setTrailer(officialTrailer.key);
          }
        })
        .catch((error) => console.error("Error fetching trailer:", error));
    }
  }, [movie]);

  if (!movie) {
    return <p className="text-center text-white text-xl mt-10">Loading...</p>;
  }

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-80 rounded-lg shadow-md"
          />

          {trailer ? (
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">Trailer</h2>
              <iframe
                className="w-full h-[26rem] rounded-lg shadow-md"
                src={`https://www.youtube.com/embed/${trailer}`}
                allowFullScreen
                title="Movie Trailer"
              ></iframe>
            </div>
          ) : (
            <p className="text-gray-400 text-center">Trailer not available</p>
          )}
        </div>

        <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 mt-2">
            {movie.release_date} | ⭐ {movie.vote_average}
          </p>
          <p className="mt-4">{movie.overview}</p>
          <p className="mt-2 text-sm text-gray-400">
            Genres: {movie.genre_ids?.join(", ")}
          </p>
        </div>

        <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cast.length > 0 ? (
              cast.map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={actor.name}
                    className="rounded-lg w-28 h-36 object-cover mx-auto shadow-md"
                  />
                  <p className="text-sm mt-2">{actor.name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No cast information available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
