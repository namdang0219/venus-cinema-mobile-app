import { View, Text, Image, StatusBar } from "react-native";
import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { Dimentions } from "@/constants/Dimentions";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import { useRouter } from "expo-router";
import DrawerHeader from "@/module/DrawerHeader";
import HorizontalListLayout from "@/components/layout/HorizontalListLayout";
import MemberCampain from "@/module/home/MemberCampain";

const campainItemWidth = Dimentions.window.width - Dimentions.appPadding * 3;

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

					{/* member sale  */}
					<MemberCampain />

					{/* upcoming  */}
					<HorizontalListLayout
						title="公開予定"
						rightButtonAction={() => {}}
						listItems={Array(5).fill(5)}
					/>

					{/* sale  */}
					<HorizontalListLayout
						title="セール"
						rightButtonAction={() => {}}
						listItems={Array(3).fill(null)}
						customItem={() => (
							<View style={{ width: campainItemWidth, gap: 10 }}>
								<CustomTouchableOpacity
									onPress={() => push("/campaign/1")}
								>
									<Image
										source={{
											uri: "https://www.venuscinema.vn/uploaded/khuyen-mai-uu-dai/uu%20dai%20com%20bo%201%20venus%20cinema%20hoa%20binh-01.jpg",
										}}
										style={{
											width: campainItemWidth,
											aspectRatio: "2/1.35",
											borderRadius: 5,
										}}
									/>
								</CustomTouchableOpacity>
								<View
									style={{
										gap: 10,
									}}
								>
									<View style={{ flex: 1 }}>
										<ThemedText
											numberOfLines={2}
											style={{
												textTransform: "uppercase",
												fontWeight: "500",
											}}
										>
											Combo bắp nước khủng
										</ThemedText>
										<ThemedText
											numberOfLines={2}
											style={{
												fontSize: 14,
												opacity: 0.6,
											}}
										>
											Ưu đãi đã khi xem phim dài, combo 1
											với giá chỉ 70K gồm 1 nước lớn + 1
											bắp lớn (chỉ áp dụng với nước uống ,
											Pepsi, 7UP, Mirinda)
										</ThemedText>
									</View>
									<View style={{ flexDirection: "row" }}>
										<CustomTouchableOpacity
											style={{
												backgroundColor:
													Colors.dark.tint,
												height: 34,
												justifyContent: "center",
												alignItems: "center",
												borderRadius: 1000,
												paddingHorizontal: 20,
											}}
											onPress={() => push("/campaign/1")}
										>
											<Text
												style={{
													color: "white",
													fontWeight: "500",
												}}
											>
												キャンペーンを見る
											</Text>
										</CustomTouchableOpacity>
									</View>
								</View>
							</View>
						)}
					/>

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
