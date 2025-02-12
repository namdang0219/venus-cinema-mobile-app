import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { View } from "react-native";
import { Dimentions } from "@/constants/Dimentions";

const SaveScreen = () => {
	return (
		<SafeAreaView>
			<Link href={"/detail/1"} style={{ color: "white" }}>
				SaveScreen
			</Link>

			{/* <View style={{ height: (Dimentions.window.width / 16) * 9 }}>
				<WebView
					source={{
						uri: "https://www.youtube.com/embed/fkwlcYHaQUE",
					}} // Thay URL video của bạn vào đây
					style={{ flex: 1 }}
					javaScriptEnabled={true}
					domStorageEnabled={true}
				/>
			</View> */}
		</SafeAreaView>
	);
};

export default SaveScreen;
