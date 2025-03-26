import { View } from "react-native";
import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import DrawerHeader from "@/module/DrawerHeader";
import MemberCampain from "@/module/home/MemberCampain";
import StoreCampain from "@/module/home/StoreCampain";
import NowShowing from "@/module/home/NowShowing";
import Upcoming from "@/module/home/Upcoming";
import MovieSlider from "@/module/home/MovieSlider";

const HomeScreen = () => {
	const [refreshing, setRefreshing] = useState<boolean>(false);

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
					<MovieSlider />

					{/* now showing  */}
					<NowShowing />

					{/* member campain  */}
					<MemberCampain />

					{/* upcoming  */}
					<Upcoming />

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
