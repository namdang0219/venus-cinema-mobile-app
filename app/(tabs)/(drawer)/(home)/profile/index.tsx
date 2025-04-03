import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { Dimentions } from "@/constants/Dimentions";
import { Colors } from "@/constants/Colors";
import CustomBgView from "@/components/custom/CustomBgView";
import { ThemedText } from "@/components/ThemedText";

const ProfileScreen = () => {
	return (
		<CustomBgView style={{ padding: Dimentions.appPadding }}>
			<FlatList
				data={Array(8).fill(null)}
				ListHeaderComponent={ProfileHeaderComponent}
				renderItem={({ item, index }) => <View></View>}
			/>
		</CustomBgView>
	);
};

const ProfileHeaderComponent = () => {
	return (
		<>
			<Image
				source={{
					uri: "https://i.pinimg.com/736x/8b/54/4b/8b544b4bf028ae7e41d82647495588d7.jpg",
				}}
				style={{ aspectRatio: "2.5/1", borderRadius: 10 }}
			/>
			<View style={{ alignItems: "center" }}>
				<Image
					source={{
						uri: "https://i.pinimg.com/736x/ae/ac/c9/aeacc9744c4ab508ef93e0329e8870f0.jpg",
					}}
					style={{
						width: 120,
						aspectRatio: "1/1",
						borderRadius: 1000,
						borderWidth: 4,
						borderColor: Colors.backgroundSecondary,
						marginTop: -60,
					}}
				/>

				<>
					<ThemedText
						style={{
							fontSize: 24,
							fontWeight: "700",
							marginTop: 10,
						}}
					>
						John Doe
					</ThemedText>
					<ThemedText style={{ color: Colors.text }}>
						@john.doe
					</ThemedText>
					<ThemedText
						style={{
							backgroundColor: Colors.tint,
							paddingHorizontal: 14,
							paddingVertical: 2,
							fontSize: 14,
							borderRadius: 10,
							fontWeight: '500',
							marginTop: 4
						}}
					>
						会員
					</ThemedText>
					
				</>
			</View>
		</>
	);
};

export default ProfileScreen;
