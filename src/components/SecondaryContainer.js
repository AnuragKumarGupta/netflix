import React from "react";
import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";

function SecondaryContainer() {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="relative mt-0 md:-mt-52 md:pl-12 z-20">
          <MoviesList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MoviesList title={"Trending"} movies={movies.trendingMovies} />
          <MoviesList title={"Popular"} movies={movies.popularMovies} />
          <MoviesList
            title={"Upcoming Movies"}
            movies={movies.upcomingMovies}
          />
        </div>
      </div>
    )
  );
}

export default SecondaryContainer;
