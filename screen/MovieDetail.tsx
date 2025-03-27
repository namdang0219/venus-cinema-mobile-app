import { View, Text, Image, Alert, StyleSheet, Share } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors, tintColor } from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimentions } from "@/constants/Dimentions";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
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
import { EvilIcons } from "@expo/vector-icons";
import useSWR from "swr";
import { fetcher } from "@/utils/func/fetcher";
import { MovieType } from "@/utils/types/MovieType";
import NoData from "@/module/NoData";
import NowShowing from "@/module/home/NowShowing";

// STATUS : 上映中 | 公開予定 | 上映終了

function renderMovieStatus(status: MovieType["movie_status"]) {
	switch (status) {
		case "NowShowing":
			return "上映中";
		case "ComingSoon":
			return "公開予定";
		case "Finished":
			return "終了";
		default:
			return "不明";
	}
}

function renderMovieStatusBg(status: MovieType["movie_status"]) {
	switch (status) {
		case "NowShowing":
			return Colors.tint;
		case "ComingSoon":
			return "#EC4899";
		case "Finished":
			return "#EF4444";
		default:
			return "不明";
	}
}

const MovieDetail = ({ movieId }: { movieId: string }) => {
	const { setOptions } = useNavigation();
	const { top } = useSafeAreaInsets();
	const width = Dimentions.window.width;
	const [showPoster, setShowPoster] = useState<boolean>(false);
	const { push } = useRouter();

	const { data } = useSWR(
		`${process.env.EXPO_PUBLIC_API_URL}/movies/${movieId}?populate=*`,
		fetcher
	);

	const movieDetail: MovieType = data?.data;

	// set page header properties
	useEffect(() => {
		setOptions({
			headerTransparent: true,
			headerTitle: "",
			headerTintColor: "white",
			headerBackButtonDisplayMode: "minimal",
			headerRight: () => (
				<CustomTouchableOpacity
					onPress={async () =>
						await Share.share(
							{
								title: "THẺ THÀNH VIÊN - TÍCH ĐIỂM ĐỔI QUÀ",
								message:
									"Cùng bạn bè thưởng thức những ưu đãi mới nhất từ Venus",
								url: "https://www.venuscinema.vn/the-thanh-vien-tich-diem-doi-qua.html",
							},
							{ tintColor: Colors.tint }
						)
					}
				>
					<EvilIcons name="share-apple" size={30} color={"white"} />
				</CustomTouchableOpacity>
			),
		});
	}, []);

	// trailer
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
					onPress: async () =>
						await openBrowserAsync(movieDetail?.trailer),
				},
			]
		);
	}, []);

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

	if (!data) return <NoData />;

	return (
		<ParallaxScrollView
			headerBackgroundColor={{
				light: Colors.input,
				dark: Colors.input,
			}}
			headerImage={
				<Image
					source={{
						uri: movieDetail?.banner.uri,
					}}
					style={{ height: (width / 16) * 8 + top }}
				/>
			}
		>
			<View style={styles.container}>
				<View style={styles.infoContainer}>
					{/* poster show modal */}
					<>
						<Pressable onPress={() => setShowPoster(true)}>
							<Image
								source={{
									uri: movieDetail?.poster.uri,
								}}
								style={{
									width: width / 3.5,
									aspectRatio: "2/3",
									backgroundColor: Colors.input,
								}}
							/>
						</Pressable>
						<CustomImageViewer
							images={[{ url: movieDetail?.poster.uri }]}
							visible={showPoster}
							setIsVisible={setShowPoster}
						/>
					</>

					<View style={{ flex: 1 }}>
						{/* status  */}
						<View
							style={[
								styles.statusContainer,
								{
									backgroundColor: renderMovieStatusBg(
										movieDetail?.movie_status
									),
								},
							]}
						>
							<ThemedText style={styles.status}>
								{renderMovieStatus(movieDetail?.movie_status)}
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
							{movieDetail?.title}
						</ThemedText>
						<ThemedText style={{ fontSize: 14 }} numberOfLines={1}>
							Diễn viên: {movieDetail?.casts}
						</ThemedText>
						<ThemedText style={{ fontSize: 14 }} numberOfLines={1}>
							Ngày chiếu:{" "}
							{movieDetail?.releaseDate.replaceAll("-", "/")}
						</ThemedText>
						<ThemedText style={{ fontSize: 14 }} numberOfLines={1}>
							Thời lượng: {movieDetail?.duration} phút
						</ThemedText>
						<ThemedText style={{ fontSize: 14 }} numberOfLines={1}>
							Ngôn ngữ: {movieDetail?.language?.name}
						</ThemedText>
					</View>
				</View>

				{/* action buttons list */}
				<ScrollView
					horizontal
					style={{ flexGrow: 0 }}
					contentContainerStyle={styles.buttonContainer}
					showsHorizontalScrollIndicator={false}
				>
					{featureButtons.map(({ label, action }, index) => (
						<CustomTouchableOpacity
							key={index}
							style={styles.button}
							onPress={action}
						>
							<Text style={styles.buttonText}>{label}</Text>
						</CustomTouchableOpacity>
					))}
				</ScrollView>

				{/* desc  */}
				<ThemedText style={styles.desc}>
					{movieDetail?.description}
				</ThemedText>

				{/* similar movie  */}
				{/* <HorizontalListLayout
					title="関連作品"
					rightButton={false}
					rightButtonAction={() => {}}
					listItems={Array(5).fill(null)}
				/> */}
				<NowShowing />
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
								color: Colors.tint,
								marginBottom: 20,
							}}
						>
							上映スケジュール
						</ThemedText>

						<Image
							source={{ uri: movieDetail?.poster.uri }}
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
							{`${movieDetail?.title} (${new Date(
								movieDetail?.releaseDate
							).getFullYear()})`}
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
											borderColor: Colors.icon,
										}}
									>
										<View
											style={{
												backgroundColor:
													Colors.input,
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		paddingTop: 20,
	},
	infoContainer: {
		paddingHorizontal: Dimentions.appPadding,
		flexDirection: "row",
		gap: 12,
	},
	statusContainer: {
		alignSelf: "flex-start",
		paddingHorizontal: 8,
		paddingVertical: 0,
		borderRadius: 100,
		marginBottom: 5,
	},
	status: {
		fontSize: 10,
		fontWeight: "500",
		lineHeight: 18,
	},
	buttonContainer: {
		marginTop: 14,
		paddingHorizontal: Dimentions.appPadding,
		gap: 10,
	},
	button: {
		backgroundColor: tintColor,
		paddingHorizontal: 14,
		paddingVertical: 6,
		borderRadius: 1000,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "500",
	},
	desc: {
		paddingHorizontal: Dimentions.appPadding,
		marginTop: 12,
		marginBottom: 20,
	},
});

export default MovieDetail;
