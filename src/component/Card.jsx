
import { useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa"; 
import { Link } from "react-router-dom";

function Card({ Name, Image ,slug}) {
  const [isAdded, setIsAdded] = useState(false); 

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  };
  return (
    <Link to={`/movie/${generateSlug(Name)}`}className="block">
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden relative transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      
      <button
        onClick={(e) => {
          e.stopPropagation(); 
          setIsAdded(!isAdded);
        }}
        className="absolute top-3 right-3 bg-black/80 text-white p-2 rounded-full text-xs transition duration-300 hover:bg-green-500 z-10"
      >
        {isAdded ? <FaCheck className="text-white" /> : <FaPlus />}
      </button>

      <div className="h-64 w-full flex items-center justify-center overflow-hidden">
        <img 
          src={Image} 
          alt={Name} 
          className="w-full h-full object-cover transition duration-300 hover:opacity-80"
        />
      </div>

      <div className="p-3 text-center bg-black text-white">
        <h2 className="text-lg font-semibold">{Name}</h2>
      </div>
    </div>
    
    </Link>
  );
}

export default Card;
