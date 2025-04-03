import { View, ViewProps } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { Colors } from "@/constants/Colors";

const CustomBgView: FC<PropsWithChildren & ViewProps> = ({
	children,
	style,
}) => {
	return (
		<View
			style={[
				{ flex: 1, backgroundColor: Colors.backgroundSecondary },
				style,
			]}
		>
			{children}
		</View>
	);
};

export default CustomBgView;
