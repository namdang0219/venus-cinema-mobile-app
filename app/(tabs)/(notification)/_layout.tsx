import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const NotificationLayout = () => {
	return <Stack>
		<Stack.Screen name="notification" options={{ headerShown: false }} />
	</Stack>;
};

export default NotificationLayout;
