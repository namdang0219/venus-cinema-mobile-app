import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="(drawer)" options={{ headerShown: false }} />
			<Stack.Screen name="detail/[movieId]" />
		</Stack>
	);
};

export default HomeLayout;
