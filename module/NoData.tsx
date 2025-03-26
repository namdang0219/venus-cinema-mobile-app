import { View, Text } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";

const NoData = () => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<ThemedText>データが存在していません！</ThemedText>
		</View>
	);
};

export default NoData;
