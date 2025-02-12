import React from "react";
import { useLocalSearchParams } from "expo-router";
import MovieDetail from "@/screen/MovieDetail";

const MovieDetailScreen = () => {
	const { movieId } = useLocalSearchParams();

	return <MovieDetail movieId={movieId as string}></MovieDetail>;
};

export default MovieDetailScreen;
