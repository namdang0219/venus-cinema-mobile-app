import React from "react";
import { Drawer } from "expo-router/drawer";
import { Colors } from "@/constants/Colors";
import DrawerHeader from "@/module/DrawerHeader";

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
				header: () => <DrawerHeader />,
			}}
		>
			<Drawer.Screen name="(home)" options={{ headerShown: false }} />
		</Drawer>
	);
};

export default Layout;
