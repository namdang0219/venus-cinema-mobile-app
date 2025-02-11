import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
					headerShown: false,
					tabBarButton: HapticTab,
					tabBarStyle: {
						backgroundColor:
							Colors[colorScheme ?? "light"].background, // Lấy màu từ theme
					},
				}}
			>
				<Tabs.Screen
					name="(drawer)"
					options={{
						title: "ホーム",
						tabBarIcon: ({ color }) => (
							<Ionicons
								size={28}
								name="home-outline"
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="search"
					options={{
						title: "検索",
						tabBarIcon: ({ color }) => (
							<Feather size={28} name="search" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="save"
					options={{
						title: "保存",
						tabBarIcon: ({ color }) => (
							<Feather size={28} name="bookmark" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="notification"
					options={{
						title: "通知",
						tabBarIcon: ({ color }) => (
							<Octicons size={26} name="bell" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="menu"
					options={{
						title: "メニュー",
						tabBarIcon: ({ color }) => (
							<Feather size={28} name="menu" color={color} />
						),
					}}
				/>
			</Tabs>
		</>
	);
}
