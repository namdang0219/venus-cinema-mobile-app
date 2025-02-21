import { initialWindowMetrics } from "react-native-safe-area-context";
import { Colors } from "./Colors";
import { Dimentions } from "./Dimentions";
import { StyleSheet } from "react-native";

const insets = initialWindowMetrics?.insets;

export const Styles = StyleSheet.create({
	shadow: {
		shadowOpacity: 1,
		shadowOffset: { height: 0, width: 0 },
		shadowRadius: 5,
		shadowColor: "black",
		borderRadius: 1000,
		elevation: 0,
	},
	actionSheetContainer: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: Colors.dark.backgroundSecondary,
		paddingBottom: insets && insets?.bottom + 16,
		paddingHorizontal: Dimentions.appPadding,
	},
	actionSheetIndicator: {
		backgroundColor: "white",
		opacity: 0.5,
		height: 4,
	},
});
