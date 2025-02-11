import React from "react";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Dimentions } from "@/constants/Dimentions";
import { AutoHeightImage } from "@/components/image/AutoHeightImage";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import HeaderContainer from "../../../../components/ui/HeaderContainer";

const logo = require("./../../../../assets/images/venus-logo.png");

const Layout = () => {
	return (
		<Drawer
			screenOptions={{
				drawerActiveBackgroundColor: "black",
				drawerActiveTintColor: Colors["dark"].tint,
				drawerType: "slide",
				drawerContentContainerStyle: {
					backgroundColor: Colors["dark"].background,
					flex: 1,
				},
				header: ({ navigation }) => (
					<HeaderContainer>
						<View style={styles.header}>
							{/* toggle icon  */}
							<CustomTouchableOpacity
								style={{ width: 30 }}
								onPress={() => navigation.openDrawer()}
							>
								<AntDesign
									name="menuunfold"
									color="white"
									size={22}
								/>
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
				),
			}}
		/>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: Dimentions.appPadding,
	},
});

export default Layout;
