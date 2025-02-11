import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
	FlatList,
	RefreshControl,
	ScrollView,
} from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { Dimentions } from "@/constants/Dimentions";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";

const itemWidth = Dimentions.window.width / 2.6;
const campainItemWidth = Dimentions.window.width - Dimentions.appPadding * 3;

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
			<StatusBar style="light" />

			<ScrollView
				style={{
					flex: 1,
					backgroundColor: Colors["dark"].backgroundSecondary,
				}}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
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
					<View style={{ gap: 12 }}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								paddingHorizontal: Dimentions.appPadding,
							}}
						>
							<ThemedText type="subtitle">上映中</ThemedText>
							<ThemedText type="link">すべて</ThemedText>
						</View>
						<FlatList
							data={Array(5).fill(Array(5).fill(null))}
							horizontal
							contentContainerStyle={{
								paddingLeft: Dimentions.appPadding,
								gap: 15,
							}}
							keyExtractor={(item, index) => index.toString()}
							showsHorizontalScrollIndicator={false}
							renderItem={({ item, index }) => (
								<View style={{ width: itemWidth }}>
									<Image
										source={{
											uri: "https://www.venuscinema.vn/temp/-uploaded-phim_yeu-nham_cr_250x350.jpg",
										}}
										style={{
											width: itemWidth,
											aspectRatio: "3/4.2",
											borderRadius: 5,
										}}
									/>
									<ThemedText
										type="defaultSemiBold"
										style={{ marginTop: 6, fontSize: 14 }}
										numberOfLines={2}
									>
										{`Yêu nhầm bạn thân (2019)`}
									</ThemedText>
									<TouchableOpacity
										style={{
											backgroundColor: Colors.dark.tint,
											height: 34,
											justifyContent: "center",
											alignItems: "center",
											borderRadius: 1000,
											marginTop: 8,
										}}
									>
										<ThemedText
											style={{
												fontSize: 13,
												color: "white",
												fontWeight: "500",
											}}
										>
											チケットを購入
										</ThemedText>
									</TouchableOpacity>
								</View>
							)}
						/>
					</View>

					{/* member sale  */}
					<View style={{ gap: 12 }}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								paddingHorizontal: Dimentions.appPadding,
							}}
						>
							<ThemedText type="subtitle">
								会員キャンペーン
							</ThemedText>
							<ThemedText type="link">すべて</ThemedText>
						</View>
						<FlatList
							data={Array(3).fill(null)}
							horizontal
							contentContainerStyle={{
								paddingLeft: Dimentions.appPadding,
								gap: 15,
							}}
							showsHorizontalScrollIndicator={false}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item, index }) => (
								<View
									style={{ width: campainItemWidth, gap: 10 }}
								>
									<Image
										source={{
											uri: "https://www.venuscinema.vn/temp/-uploaded-khuyen-mai-uu-dai_THE-THANH-VIEN-TICH-DIEM-DOI-QUA_cr_590x270.png",
										}}
										style={{
											width: campainItemWidth,
											aspectRatio: "2/0.95",
											borderRadius: 5,
										}}
									/>
									<View
										style={{
											flexDirection: "row",
											gap: 10,
										}}
									>
										<ThemedText
											numberOfLines={2}
											style={{
												flex: 1,
												textTransform: "uppercase",
											}}
										>
											ĐIỂM CÀNG LỚN - QUÀ CÀNG TO | SĂN
											NGAY KẺO LỠ
										</ThemedText>
										<CustomTouchableOpacity
											style={{
												backgroundColor:
													Colors.dark.tint,
												height: 34,
												justifyContent: "center",
												alignItems: "center",
												borderRadius: 1000,
												width: 50,
											}}
										>
											<Text
												style={{
													color: "white",
													fontWeight: "500",
												}}
											>
												見る
											</Text>
										</CustomTouchableOpacity>
									</View>
								</View>
							)}
						/>
					</View>

					{/* upcoming  */}
					<View style={{ gap: 12 }}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								paddingHorizontal: Dimentions.appPadding,
							}}
						>
							<ThemedText type="subtitle">上映予定</ThemedText>
							<ThemedText type="link">すべて</ThemedText>
						</View>
						<FlatList
							data={Array(5).fill(Array(5).fill(null))}
							horizontal
							contentContainerStyle={{
								paddingLeft: Dimentions.appPadding,
								gap: 15,
							}}
							keyExtractor={(item, index) => index.toString()}
							showsHorizontalScrollIndicator={false}
							renderItem={({ item, index }) => (
								<View style={{ width: itemWidth }}>
									<Image
										source={{
											uri: "https://www.venuscinema.vn/temp/-uploaded-phim_yeu-nham_cr_250x350.jpg",
										}}
										style={{
											width: itemWidth,
											aspectRatio: "3/4.2",
											borderRadius: 5,
										}}
									/>
									<ThemedText
										type="defaultSemiBold"
										style={{ marginTop: 6, fontSize: 14 }}
										numberOfLines={2}
									>
										{`Crazy Rich Asians (2019)`}
									</ThemedText>
									<CustomTouchableOpacity
										style={{
											backgroundColor: Colors.dark.tint,
											height: 34,
											justifyContent: "center",
											alignItems: "center",
											borderRadius: 1000,
											marginTop: 8,
										}}
									>
										<ThemedText
											style={{
												fontSize: 13,
												color: "white",
												fontWeight: "500",
											}}
										>
											チケットを購入
										</ThemedText>
									</CustomTouchableOpacity>
								</View>
							)}
						/>
					</View>

					{/* member sale  */}
					<View style={{ gap: 12 }}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								paddingHorizontal: Dimentions.appPadding,
							}}
						>
							<ThemedText type="subtitle">
								キャンペーン
							</ThemedText>
							<ThemedText type="link">すべて</ThemedText>
						</View>
						<FlatList
							data={Array(3).fill(null)}
							horizontal
							contentContainerStyle={{
								paddingLeft: Dimentions.appPadding,
								gap: 15,
							}}
							showsHorizontalScrollIndicator={false}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item, index }) => (
								<View
									style={{ width: campainItemWidth, gap: 10 }}
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
												Ưu đãi đã khi xem phim dài,
												combo 1 với giá chỉ 70K gồm 1
												nước lớn + 1 bắp lớn (chỉ áp
												dụng với nước uống , Pepsi, 7UP,
												Mirinda)
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
					</View>

					<View style={{opacity: 0.5, marginTop: 30}}>
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
