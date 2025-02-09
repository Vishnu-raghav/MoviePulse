import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWatchlist } from "../store/watchList/watchlistAsync";
import Card from "../component/Card";

function WatchList() {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.movies) || [];
  const status = useSelector((state) => state.watchlist.status);
  const userId = useSelector((state) => state.auth.userData?.$id);

  useEffect(() => {
    if (userId) {
      dispatch(fetchWatchlist(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-5 md:px-20">

      {status === "loading" ? (
        // Skeleton Loader
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-60 bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      ) : watchlist.length === 0 ? (
       
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-lg mt-4 text-gray-300">No movies in your watchlist.</p>
        </div>
      ) : (
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <Card
              key={movie.$id}
              Name={movie?.title || "Unknown Title"}
              Image={movie?.poster || movie?.Poster || "https://via.placeholder.com/150"}
              movieId={movie?.movieId}
              isWatchlistPage
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchList;

