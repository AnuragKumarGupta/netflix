import React from "react";
import { IMG_CDN } from "../utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
      <img alt="Movie Card" src={IMG_CDN + posterPath} />
    </div>
  );
};

export default MovieCard;
