import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import BookTicket from "@/screen/BookTicket";

const BookScreen = () => {
	const params = useLocalSearchParams();
	const { setOptions } = useNavigation();
	const movieId: string = params.book as string;

	useEffect(() => {
		setOptions({
			headerTitle: "チケット購入",
			headerBackTitle: "戻る",
			headerTintColor: "white",
		});
	}, []);

	return <BookTicket movieId={movieId} />;
};

export default BookScreen;
