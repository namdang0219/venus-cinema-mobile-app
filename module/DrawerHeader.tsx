import { View, StyleSheet } from "react-native";
import React from "react";
import HeaderContainer from "@/components/ui/HeaderContainer";
import { useNavigation } from "expo-router";
import { Dimentions } from "@/constants/Dimentions";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import { DrawerActions } from "@react-navigation/native";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { AutoHeightImage } from "@/components/image/AutoHeightImage";

const logo = require("./../assets/images/venus-logo.png");

const DrawerHeader = () => {
	const { dispatch } = useNavigation();

	return (
		<HeaderContainer>
			<View style={styles.header}>
				{/* toggle icon  */}
				<CustomTouchableOpacity
					style={{ width: 30 }}
					onPress={() => dispatch(DrawerActions.openDrawer())}
				>
					<AntDesign name="menuunfold" color="white" size={22} />
				</CustomTouchableOpacity>

				{/* logo  */}
				<AutoHeightImage source={logo} width={100} />

				{/* user icon  */}
				<CustomTouchableOpacity style={{ width: 30 }}>
					<FontAwesome6
						name="circle-user"
						size={22}
						color="white"
						style={{ marginLeft: "auto" }}
					/>
				</CustomTouchableOpacity>
			</View>
		</HeaderContainer>
	);
};

const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: Dimentions.appPadding,
	},
});

export default DrawerHeader;
