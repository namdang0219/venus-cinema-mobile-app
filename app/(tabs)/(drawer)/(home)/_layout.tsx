import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";

const HomeLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen
				name="profile/index"
				options={{
					headerShown: true,
					title: "プロフィール",
					headerTintColor: Colors.tint,
					headerBackButtonDisplayMode: 'minimal'
				}}
			/>
		</Stack>
	);
};

export default HomeLayout;
