import React from "react";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Dimentions } from "@/constants/Dimentions";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AutoHeightImage } from "@/components/image/AutoHeightImage";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";

const logo = require("./../../../assets/images/venus-logo.png");

const Layout = () => {
	const insets = useSafeAreaInsets();
	const scheme = useColorScheme();

	const styles = StyleSheet.create({
		headerContainer: {
			paddingTop: insets.top,
			backgroundColor: Colors[scheme ?? "light"].background,
		},
		headerMain: {
			height: Dimentions.headerHeight,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingHorizontal: Dimentions.appPadding,
		},
	});

	return (
		<>
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
						<View style={styles.headerContainer}>
							<View style={styles.headerMain}>
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
						</View>
					),
				}}
			/>
		</>
	);
};

export default Layout;
