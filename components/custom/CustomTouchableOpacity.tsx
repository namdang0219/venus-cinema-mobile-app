import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import React, { FC, PropsWithChildren } from "react";

const CustomTouchableOpacity: FC<PropsWithChildren & TouchableOpacityProps> = ({
	children,
	...props
}) => {
	return (
		<TouchableOpacity activeOpacity={0.5} {...props}>
			{children}
		</TouchableOpacity>
	);
};

export default CustomTouchableOpacity;
