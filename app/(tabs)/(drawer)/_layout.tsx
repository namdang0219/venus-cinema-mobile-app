import React from "react";
import { Drawer } from "expo-router/drawer";
import { Colors } from "@/constants/Colors";
import DrawerHeader from "@/module/DrawerHeader";

const Layout = () => {
	return (
		<Drawer
			screenOptions={{
				drawerActiveBackgroundColor: "black",
				drawerActiveTintColor: Colors.tint,
				drawerInactiveTintColor: Colors.icon,
				drawerType: "slide",
				drawerContentContainerStyle: {
					backgroundColor: Colors.background,
					flex: 1,
				},
				headerBackButtonDisplayMode: "minimal",
				header: () => <DrawerHeader />,
			}}
		>
			<Drawer.Screen
				name="(home)"
				options={{ title: "ホーム", headerShown: false }}
			/>
			<Drawer.Screen
				name="ticketPrice"
				options={{ title: "チケット料金" }}
			/>
			<Drawer.Screen name="rule" options={{ title: "利用規約" }} />
			<Drawer.Screen name="contact" options={{ title: "お問い合わせ" }} />
		</Drawer>
	);
};

export default Layout;
