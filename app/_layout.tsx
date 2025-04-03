import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SheetProvider } from "react-native-actions-sheet";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Colors } from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<StatusBar barStyle="light-content" />
					<ThemeProvider
						value={
							// colorScheme === "dark" ? DefaultTheme : DarkTheme
							DarkTheme
						}
					>
						<SheetProvider context="global">
							<Stack>
								<Stack.Screen
									name="(tabs)"
									options={{ headerShown: false }}
								/>
								<Stack.Screen name="+not-found" />
							</Stack>
						</SheetProvider>
						<StatusBar barStyle="light-content" />
					</ThemeProvider>
				</GestureHandlerRootView>
			</SafeAreaProvider>
		</Provider>
	);
}
