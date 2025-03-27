import { View } from "react-native";
import React, { FC } from "react";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

type PostHeaderProps = {
	title: string;
};

const PostHeader: FC<PostHeaderProps> = ({ title }) => {
	return (
		<View style={{ flexDirection: "row", gap: 10 }}>
			<View
				style={{ width: 4, backgroundColor: Colors.tint }}
			></View>
			<ThemedText
				type="title"
				style={{ fontSize: 26, lineHeight: 36, flex: 1 }}
			>
				{title}
			</ThemedText>
		</View>
	);
};

export default PostHeader;
