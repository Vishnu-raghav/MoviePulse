// import { Link } from "react-router-dom";

function Card({
  Name,
  Image,
  className,
  linkTo = "/",  // Default link to home (can be passed as a prop)
  ...props
}) {
  return (
    <div
      className={`bg-black ml-36 mt-28 h-[380px] w-52 rounded-lg text-white ${className}`}
      {...props}
    >
      {/* Image Section */}
      <div className="bg-amber-400 h-64 w-full flex items-center justify-center overflow-hidden rounded-t-lg">
        <img
          src={Image}
          alt={Name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Name Section */}
      <div className="mt-2 text-center bg-amber-400 font-semibold p-2">{Name}</div>

      {/* Link Section */}
      {/* <div className="mt-2 text-center">
        <Link to={linkTo} className="text-blue-500 hover:underline">
          Go to details
        </Link>
      </div> */}
    </div>
  );
}

export default Card;
