import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const SaveScreen = () => {
	return (
		<SafeAreaView>
			<Link href={"/detail/1"} style={{ color: "white" }}>
				SaveScreen
			</Link>
		</SafeAreaView>
	);
};

export default SaveScreen;
