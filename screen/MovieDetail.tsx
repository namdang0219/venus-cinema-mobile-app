import { View, Text, Image, Linking, Alert } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors, tintColor } from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimentions } from "@/constants/Dimentions";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import HorizontalListLayout from "@/components/layout/HorizontalListLayout";
import CustomImageViewer from "@/components/custom/CustomImageViewer";
import ActionSheet, {
	ActionSheetRef,
	FlatList,
} from "react-native-actions-sheet";
import { Styles } from "@/constants/Styles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useItemWidth } from "@/hooks/useItemWidth";
import { openBrowserAsync } from "expo-web-browser";
import Button from "@/components/button/Button";

// STATUS : 上映中 | 公開予定 | 上映終了

const MovieDetail = ({ movieId }: { movieId: string }) => {
	const { setOptions } = useNavigation();
	const { top } = useSafeAreaInsets();
	const width = Dimentions.window.width;
	const [showPoster, setShowPoster] = useState<boolean>(false);
	const { push } = useRouter();

	useEffect(() => {
		setOptions({
			headerTransparent: true,
			headerTitle: "",
			headerTintColor: "white",
			headerBackButtonDisplayMode: "minimal"
		});
	}, []);

	const coverUri =
		"https://mtg.1cdn.vn/2025/02/02/b6d813ea-7a65-43b5-a04f-c72e4017cdf3.jpg";
	const posterUri =
		"https://riocinemas.vn//Areas/Admin/Content/Fileuploads/images/poster%20web/2025/T1/n_h_n_b_c_t_-teaser_poster_kt_facebook_-dkkc_mung_1_tet%20(1).jpg";

	// trailer
	const trailerUrl = "https://www.youtube.com/watch?v=-iX9mj7AsOg";

	const openTrailerUrl = useCallback(async () => {
		Alert.alert(
			"サイトを開きますか？",
			"アプリケーション内のブラウザを使用して使用してサイトをアクセスしてもよろしですか？",
			[
				{
					text: "キャンセル",
					style: "cancel",
				},
				{
					text: "開く",
					style: "default",
					onPress: async () => await openBrowserAsync(trailerUrl),
				},
			]
		);
	}, [trailerUrl]);

	const featureButtons: { label: string; action: () => void }[] = [
		{ label: "予告編", action: openTrailerUrl },
		{ label: "スケジュール", action: showScheduleSheet },
		{ label: "チケット購入", action: () => push("/book/1") },
	];

	// Schedule Action Sheet handler
	const scheduleSheetRef = useRef<ActionSheetRef>(null);

	function showScheduleSheet() {
		scheduleSheetRef.current?.show();
	}

	// Date Picker handler
	const [selectedDate, setSelectedDate] = useState(new Date());
	const today = new Date();
	const maxDate = new Date();
	maxDate.setDate(today.getDate() + 5);

	const itemWidth = useItemWidth(10, 4, Dimentions.appPadding);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{
				light: Colors.light.input,
				dark: Colors.dark.input,
			}}
			headerImage={
				<Image
					source={{
						uri: coverUri,
					}}
					style={{ height: (width / 16) * 8 + top }}
				/>
			}
		>
			<View
				style={{
					flex: 1,
					backgroundColor: Colors.dark.background,
					paddingTop: 20,
				}}
			>
				<View
					style={{
						paddingHorizontal: Dimentions.appPadding,
						flexDirection: "row",
						gap: 12,
					}}
				>
					<>
						<Pressable onPress={() => setShowPoster(true)}>
							<Image
								source={{
									uri: posterUri,
								}}
								style={{
									width: width / 3.5,
									aspectRatio: "2/3",
									backgroundColor: Colors.dark.input,
								}}
							/>
						</Pressable>
						<CustomImageViewer
							images={[{ url: posterUri }]}
							visible={showPoster}
							setIsVisible={setShowPoster}
						/>
					</>
					<View style={{ flex: 1 }}>
						{/* status  */}
						<View
							style={{
								backgroundColor: Colors["dark"].tint,
								alignSelf: "flex-start",
								paddingHorizontal: 8,
								paddingVertical: 0,
								borderRadius: 100,
								marginBottom: 5,
							}}
						>
							<ThemedText
								style={{
									fontSize: 10,
									fontWeight: "500",
									lineHeight: 18,
								}}
							>
								上映中
							</ThemedText>
						</View>
						<ThemedText
							type="subtitle"
							style={{
								textTransform: "uppercase",
								marginBottom: 6,
							}}
							numberOfLines={2}
						>
							Nụ hôn bạc tỷ (2025)
						</ThemedText>
						<ThemedText style={{ fontSize: 14 }} numberOfLines={1}>
							Thể loại: Hài, Tình cảm
						</ThemedText>
						<ThemedText style={{ fontSize: 14 }} numberOfLines={1}>
							Ngày chiếu: 12/02/2025
						</ThemedText>
						<ThemedText style={{ fontSize: 14 }} numberOfLines={1}>
							Thời lượng: 120 phút
						</ThemedText>
						<ThemedText style={{ fontSize: 14 }} numberOfLines={1}>
							Ngôn ngữ: Tiếng Việt
						</ThemedText>
					</View>
				</View>

				{/* button  */}
				<ScrollView
					horizontal
					style={{ flexGrow: 0 }}
					contentContainerStyle={{
						marginTop: 14,
						paddingHorizontal: Dimentions.appPadding,
						gap: 10,
					}}
					showsHorizontalScrollIndicator={false}
				>
					{featureButtons.map(({ label, action }, index) => (
						<CustomTouchableOpacity
							key={index}
							style={{
								backgroundColor: tintColor,
								paddingHorizontal: 14,
								paddingVertical: 6,
								borderRadius: 1000,
							}}
							onPress={action}
						>
							<Text
								style={{
									color: "white",
									fontSize: 16,
									fontWeight: "500",
								}}
							>
								{label}
							</Text>
						</CustomTouchableOpacity>
					))}
				</ScrollView>

				{/* desc  */}
				<ThemedText
					style={{
						paddingHorizontal: Dimentions.appPadding,
						marginTop: 12,
						marginBottom: 20,
					}}
				>
					Câu chuyện xoay quanh Vân - cô gái bán bánh mì vô tình gặp
					phải hai chàng trai trong một tai nạn nhỏ. Làm thế nào khi
					tiếng sét ái tình đánh một lúc cả ba người? Liệu giữa một
					chàng trai chững chạc, nam tính và một chàng trai đôi chút
					ngông nghênh, cool ngầu - đâu sẽ là “Nụ Hôn Bạc Tỷ” của cô
					gái xinh đẹp?
				</ThemedText>

				{/* similar movie  */}
				<HorizontalListLayout
					title="関連作品"
					rightButton={false}
					rightButtonAction={() => {}}
					listItems={Array(5).fill(null)}
				/>
			</View>

			<ActionSheet
				ref={scheduleSheetRef}
				gestureEnabled
				containerStyle={Styles.actionSheetContainer}
				indicatorStyle={Styles.actionSheetIndicator}
			>
				<View style={{ paddingTop: 10 }}>
					<View style={{ alignItems: "center" }}>
						<ThemedText
							type="subtitle"
							style={{
								color: Colors["dark"].tint,
								marginBottom: 20,
							}}
						>
							上映スケジュール
						</ThemedText>

						<Image
							source={{ uri: posterUri }}
							style={{
								width: width / 3,
								aspectRatio: "2/3",
								marginBottom: 14,
							}}
						/>
						<ThemedText
							style={{
								textTransform: "uppercase",
								fontSize: 18,
								fontWeight: "500",
								paddingHorizontal: width / 8,
								textAlign: "center",
							}}
							numberOfLines={2}
						>
							Nụ hôn bạc tỷ (2025)
						</ThemedText>
					</View>

					{/* Schedule area  */}
					<View
						style={{
							marginTop: 14,
						}}
					>
						<View
							style={{
								marginHorizontal: "auto",
							}}
						>
							<RNDateTimePicker
								value={selectedDate}
								display="default"
								mode="date"
								minimumDate={today}
								maximumDate={maxDate}
								onChange={(event, date) => {
									if (date) setSelectedDate(date);
								}}
							/>
						</View>
						<View>
							<FlatList
								data={Array(6).fill(null)}
								numColumns={4}
								contentContainerStyle={{
									gap: 10,
									marginTop: 20,
								}}
								columnWrapperStyle={{
									gap: 10,
								}}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item, index }) => (
									<View
										style={{
											width: itemWidth,
											borderWidth: 1,
											borderColor: Colors["dark"].icon,
										}}
									>
										<View
											style={{
												backgroundColor:
													Colors["dark"].input,
												height: 32,
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<ThemedText>9:00</ThemedText>
										</View>
										<View
											style={{
												height: 32,
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<ThemedText
												style={{ fontSize: 12 }}
											>
												2D (PhụĐề)
											</ThemedText>
										</View>
									</View>
								)}
							/>
						</View>
					</View>

					<Button
						onPress={() => {
							scheduleSheetRef.current?.hide();
							push("/book/1");
						}}
					>
						チケット購入へ
					</Button>
				</View>
			</ActionSheet>
		</ParallaxScrollView>
	);
};

export default MovieDetail;
