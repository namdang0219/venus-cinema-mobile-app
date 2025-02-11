import { StyleSheet, View } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Dimentions } from "@/constants/Dimentions";

const HeaderContainer: FC<PropsWithChildren> = ({ children }) => {
	const insets = useSafeAreaInsets();
	const scheme = useColorScheme();

	const styles = StyleSheet.create({
		headerContainer: {
			paddingTop: insets.top,
			backgroundColor: Colors[scheme ?? "light"].background,
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
