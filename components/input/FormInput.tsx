import { View, Text, TextInputProps, StyleSheet } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";

const FormInput: FC<PropsWithChildren & TextInputProps> = ({
	children,
	style,
	placeholder = "入力",
	...props
}) => {
	return (
		<TextInput
			placeholder={placeholder}
			style={[styles.defaultStyle, style]}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	defaultStyle: {
		backgroundColor: Colors.dark.input,
		paddingHorizontal: 12,
		paddingVertical: 12,
		borderRadius: 8,
		color: Colors.dark.text,
	},
});

export default FormInput;
