import { View, Image } from "react-native";
import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { Dimentions } from "@/constants/Dimentions";
import { useRouter } from "expo-router";
import DrawerHeader from "@/module/DrawerHeader";
import HorizontalListLayout from "@/components/layout/HorizontalListLayout";
import MemberCampain from "@/module/home/MemberCampain";
import StoreCampain from "@/module/home/StoreCampain";

const HomeScreen = () => {
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const { push } = useRouter();

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<>
			<DrawerHeader />

			<ScrollView
				style={{
					flex: 1,
					backgroundColor: Colors["dark"].backgroundSecondary,
				}}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor={"white"}
					/>
				}
			>
				<View style={{ gap: 32, paddingBottom: 20 }}>
					{/* movie slider  */}
					<View>
						<View>
							<Image
								source={{
									uri: "https://i.ytimg.com/vi/Jo8puu4u2MI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBdozwVsi7xeFzoMmWe5kWxbf2xrg",
								}}
								style={{
									width: Dimentions.window.width,
									aspectRatio: "16/10",
								}}
							/>
						</View>
					</View>

					{/* playing  */}
					<HorizontalListLayout
						title="上映中"
						rightButtonAction={() => {}}
						listItems={Array(5).fill(Array(5))}
					/>

					{/* member campain  */}
					<MemberCampain />

					{/* upcoming  */}
					<HorizontalListLayout
						title="公開予定"
						rightButtonAction={() => {}}
						listItems={Array(5).fill(5)}
					/>

					{/* store campain  */}
					<StoreCampain />

					<View style={{ opacity: 0.5, marginTop: 30 }}>
						<ThemedText
							style={{
								fontSize: 10,
								textAlign: "center",
								textTransform: "uppercase",
								lineHeight: 16,
							}}
						>
							Công ty TNHH Thương Mại Và Dịch Vụ Giải Trí Sao Kim
						</ThemedText>
						<ThemedText
							style={{
								fontSize: 10,
								textAlign: "center",
								textTransform: "uppercase",
								lineHeight: 16,
							}}
						>
							© 2019 , ALL RIGHTS RESERVED.
						</ThemedText>
					</View>
				</View>
			</ScrollView>
		</>
	);
};

export default HomeScreen;
