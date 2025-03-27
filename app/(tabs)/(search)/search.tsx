import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import HeaderContainer from "@/components/ui/HeaderContainer";
import { Dimentions } from "@/constants/Dimentions";
import { TextInput } from "react-native-gesture-handler";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const SearchScreen = () => {
	const scheme = useColorScheme();
	const inputRef = useRef<TextInput>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
		return () => {
			inputRef.current?.blur();
		};
	}, []);

	const handleCancel = () => {
		inputRef.current?.clear();
	};

	return (
		<HeaderContainer>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					flex: 1,
					paddingHorizontal: Dimentions.appPadding,
					gap: 15,
				}}
			>
				<TextInput
					ref={inputRef}
					placeholder="映画を検索..."
					style={{
						backgroundColor: Colors.input,
						flex: 1,
						paddingHorizontal: 15,
						paddingVertical: 8,
						borderRadius: 8,
						color: Colors.text,
					}}
				/>
				<CustomTouchableOpacity onPress={handleCancel}>
					<ThemedText type="link">キャンセル</ThemedText>
				</CustomTouchableOpacity>
			</View>
		</HeaderContainer>
	);
};

export default SearchScreen;
