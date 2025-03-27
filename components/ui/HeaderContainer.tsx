import { StyleSheet, View } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Dimentions } from "@/constants/Dimentions";

const HeaderContainer: FC<PropsWithChildren> = ({ children }) => {
	const insets = useSafeAreaInsets();

	const styles = StyleSheet.create({
		headerContainer: {
			paddingTop: insets.top,
			backgroundColor: Colors.background,
		},
		headerMain: {
			height: Dimentions.headerHeight,
		},
	});

	return (
		<View style={styles.headerContainer}>
			<View style={styles.headerMain}>{children}</View>
		</View>
	);
};

export default HeaderContainer;
