import { ActivityIndicator, Text } from "react-native";
import React, { FC } from "react";
import CustomTouchableOpacity from "../custom/CustomTouchableOpacity";
import { Colors } from "@/constants/Colors";
import { TouchableOpacityProps } from "react-native-gesture-handler";

type ButtonProps = {
	loading?: boolean;
};

const Button: FC<TouchableOpacityProps & ButtonProps> = ({
	onPress,
	style,
	children,
	loading = false,
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
			{!loading ? (
				<Text
					style={{
						fontSize: 18,
						fontWeight: "500",
						color: "white",
					}}
				>
					{children}
				</Text>
			) : (
				<ActivityIndicator color="white" />
			)}
		</CustomTouchableOpacity>
	);
};

export default Button;
