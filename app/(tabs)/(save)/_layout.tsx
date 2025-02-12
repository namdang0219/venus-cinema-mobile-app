import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const SaveLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="save" options={{ headerShown: false }} />
		</Stack>
	);
};

export default SaveLayout;
