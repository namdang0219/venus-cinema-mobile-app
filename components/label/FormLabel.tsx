import { StyleSheet, TextProps } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { ThemedText } from "../ThemedText";

const FormLabel: FC<PropsWithChildren & TextProps> = ({
	children,
	style = styles.defaultStyle,
	...props
}) => {
	return (
		<ThemedText className="" style={style} {...props}>
			{children}
		</ThemedText>
	);
};

const styles = StyleSheet.create({
	defaultStyle: {
		fontSize: 16,
		marginBottom: 6,
		fontWeight: "600",
	},
});

export default FormLabel;
