import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const MenuLayout = () => {
	return <Stack>
        <Stack.Screen name="menu" options={{ headerShown: false }} />
    </Stack>;
};

export default MenuLayout;
