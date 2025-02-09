import { useState } from "react";
import { FaPlus, FaCheck, FaTrash } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addMovieToWatchlist, removeMovieFromWatchlist, fetchWatchlist } from "../store/watchList/watchlistAsync";

import Login from "../component/Login";
import Signup from "../component/Signup";

function Card({ Name, Image, movieId, isWatchlistPage = false }) {
  const dispatch = useDispatch();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false); 

  const authStatus = useSelector((state) => state.auth.status); 
  const userId = useSelector((state) => state.auth.userData?.$id);
  const watchlist = useSelector((state) => state.watchlist.movies) || []; 

  
  useState(() => {
    setIsAdded(watchlist.some((movie) => movie?.movieId === String(movieId)));
  }, [watchlist, movieId]);

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  };

  const handleAddToWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    if (!authStatus || !userId) {
      setIsLoginOpen(true);
      return;
    }

    setIsAdded(true); 

    const movieData = {
      movieId: String(movieId), 
      title: Name,
      poster: Image,
      userId,
    };
  
    try {
      await dispatch(addMovieToWatchlist(movieData)).unwrap();
      dispatch(fetchWatchlist(userId)); 
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      setIsAdded(false); 
    }
  };
  
  const handleRemoveFromWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const movieToRemove = watchlist.find((movie) => movie.movieId === String(movieId));
    if (!movieToRemove) return;

    setIsAdded(false); 

    try {
      await dispatch(removeMovieFromWatchlist(movieToRemove.$id)).unwrap();
      dispatch(fetchWatchlist(userId)); 
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      setIsAdded(true); 
    }
  };

  return (
    <>
      <Link to={`/movie/${generateSlug(Name)}`} className="block">
        <div className="w-48 sm:w-52 md:w-60 bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
          {!isWatchlistPage ? (
            <button
              onClick={isAdded ? handleRemoveFromWatchlist : handleAddToWatchlist}
              className={`absolute top-3 right-3 p-2 rounded-full transition 
                ${isAdded ? "bg-green-500 text-white hover:bg-green-700" : "bg-black/80 text-white hover:bg-green-500"}`}
            >
              {isAdded ? <FaCheck /> : <FaPlus />}
            </button>
          ) : (
            <button
              onClick={handleRemoveFromWatchlist}
              className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full hover:bg-red-800"
            >
              <FaTrash />
            </button>
          )}

          <div className="w-full h-auto">
            <img 
              src={Image} 
              alt={Name} 
              className="w-full h-auto object-cover rounded-t-lg"
            />
          </div>

          <div className="p-3 text-center bg-black text-white">
            <h2 className="text-sm sm:text-base font-semibold">{Name}</h2>
          </div>
        </div>
      </Link>

      {isLoginOpen && (
        <Login
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          switchToSignUp={() => {
            setIsLoginOpen(false);
            setIsSignUpOpen(true);
          }}
        />
      )}

      {isSignUpOpen && (
        <SignUp
          isOpen={isSignUpOpen}
          onClose={() => setIsSignUpOpen(false)}
          switchToLogin={() => {
            setIsSignUpOpen(false);
            setIsLoginOpen(true);
          }}
        />
      )}
    </>
  );
}

export default Card;
