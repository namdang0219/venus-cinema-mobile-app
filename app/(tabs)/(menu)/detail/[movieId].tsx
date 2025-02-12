import { View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

const MovieDetailScreen = () => {
	const { movieId } = useLocalSearchParams();

	return (
		<View>
			<ThemedText>MovieDetailScreen {`${movieId}`}</ThemedText>
		</View>
	);
};

export default MovieDetailScreen;
