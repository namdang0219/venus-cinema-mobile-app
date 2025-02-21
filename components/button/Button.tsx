import { Text } from "react-native";
import React, { FC } from "react";
import CustomTouchableOpacity from "../custom/CustomTouchableOpacity";
import { Colors } from "@/constants/Colors";
import { TouchableOpacityProps } from "react-native-gesture-handler";

const Button: FC<TouchableOpacityProps> = ({
	onPress,
	style,
	children,
	...props
}) => {
	return (
		<CustomTouchableOpacity
			style={[
				{
					marginTop: 45,
					backgroundColor: Colors["dark"].tint,
					height: 48,
					justifyContent: "center",
					alignItems: "center",
					borderRadius: 10,
				},
				style,
			]}
			onPress={onPress}
			{...props}
		>
			<Text
				style={{
					fontSize: 18,
					fontWeight: "500",
					color: "white",
				}}
			>
				{children}
			</Text>
		</CustomTouchableOpacity>
	);
};

export default Button;
