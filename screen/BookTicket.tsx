import { Dimensions, Image, Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Colors } from "@/constants/Colors";
import {
	AntDesign,
	Feather,
	Fontisto,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { FlatList, Pressable } from "react-native-gesture-handler";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import { Styles } from "@/constants/Styles";
import Animated, { FadeInRight } from "react-native-reanimated";
import Button from "@/components/button/Button";
import { useRouter } from "expo-router";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { tintColor } from "../constants/Colors";
import { Dimentions } from "@/constants/Dimentions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormLabel from "@/components/label/FormLabel";
import FormInput from "@/components/input/FormInput";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("screen");

const BookTicket = ({ movieId }: { movieId: string }) => {
	const tintColor = Colors.tint;
	const [activeStep, setActiveStep] = useState<number>(0);
	const { push, replace } = useRouter();
	const insets = useSafeAreaInsets();

	const paymentSheetRef = useRef<ActionSheetRef>(null);

	const rows = ["A", "B", "C", "D", "E"];
	const seatsPerRow = 12;

	const generateSeats = () => {
		return rows.map((row) => ({
			row,
			seats: Array.from({ length: seatsPerRow }, (_, index) => ({
				id: `${row}${index + 1}`,
				number: index + 1,
				isSelected: false,
				isBooked: Math.random() < 0.2, // Giả lập một số ghế đã được đặt trước
			})),
		}));
	};

	const [seatsData, setSeatsData] = useState(generateSeats());

	const getSelectedSeats = () => {
		return seatsData.flatMap((row) =>
			row.seats.filter((seat) => seat.isSelected).map((seat) => seat.id)
		);
	};

	const [addCardModalOpen, setAddCardModalOpen] = useState<boolean>(false);

	const toggleSeatSelection = (row: string, seatNumber: number) => {
		setSeatsData((prevSeats) =>
			prevSeats.map((seatRow) =>
				seatRow.row === row
					? {
							...seatRow,
							seats: seatRow.seats.map((seat) =>
								seat.number === seatNumber
									? seat.isBooked
										? seat // Nếu ghế đã đặt thì giữ nguyên
										: {
												...seat,
												isSelected: !seat.isSelected,
										  }
									: seat
							),
					  }
					: seatRow
			)
		);
	};

	const [seatAreaWidth, setSeatAreaWidth] = useState<number>(0);
	const seatAreaMarginH = 10;
	const seatWidth = 22;
	const seatGap =
		(seatAreaWidth - seatWidth * seatsPerRow - seatAreaMarginH * 2) /
		(seatsPerRow - 1);

	const seatStatus = [
		{ status: "指定可能", color: "#6B7280" },
		{ status: "選択済み", color: tintColor },
		{ status: "選択不可", color: "#374151" },
	];

	const [selectingCard, setSelectingCard] = useState<number | null>(
		cardInfos.length > 0 ? 0 : null
	);

	const [paying, setPaying] = useState<boolean>(false);

	const [cardNumber, setCardNumber] = useState<string>();

	const [cvv, setCvv] = useState<string>("");

	const [expirationDate, setExpirationDate] = useState<string>("");

	const handleTextChange = (text: string) => {
		let cleanedText = text.replace(/[^0-9]/g, "");

		if (cleanedText.length > 2) {
			cleanedText = cleanedText.slice(0, 2) + "/" + cleanedText.slice(2);
		}

		if (cleanedText.length <= 5) {
			setExpirationDate(cleanedText);
		}
	};

	const animationRef = useRef<LottieView>(null);

	const handlePayment = () => {
		setPaying(true);
		setTimeout(() => {
			setPaying(false);
			setSuccessModalOpen(true);
		}, 1000);
	};

	// success modal
	const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

	useEffect(() => {
		if (successModalOpen) {
			setTimeout(() => {
				animationRef.current?.play(0, 45);
			}, 200);
		} else {
			animationRef.current?.reset();
		}

		return () => {
			animationRef.current?.reset();
		};
	}, [successModalOpen]);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: Colors.backgroundSecondary,
				position: "relative",
			}}
		>
			<ProgressSteps
				activeStep={activeStep}
				activeLabelColor={tintColor}
				activeStepIconBorderColor={tintColor}
				activeStepNumColor="white"
				activeStepIconColor={tintColor}
				completedProgressBarColor={tintColor}
				completedLabelColor={tintColor}
				completedStepIconColor={tintColor}
				disabledStepIconColor="gray"
				activeLabelFontSize={12}
				labelFontSize={12}
				topOffset={20}
				marginBottom={18}
				progressBarColor="gray"
			>
				<ProgressStep label="映画選択" scrollable={false} removeBtnRow>
					<Animated.View style={{ flex: 1 }} entering={FadeInRight}>
						{/* movie list  */}
						<FlatList
							data={Array(5).fill(null)}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{ paddingBottom: 50 }}
							ListHeaderComponent={
								<ThemedText
									style={{
										textAlign: "center",
										color: "white",
										opacity: 0.5,
										fontSize: 14,
									}}
								>
									映画を選択してください
								</ThemedText>
							}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item, index }) => (
								<>
									<View
										style={{
											flexDirection: "row",
											gap: 18,
											borderBottomColor: Colors.icon,
											borderBottomWidth:
												StyleSheet.hairlineWidth,
											paddingVertical: 20,
										}}
									>
										<View>
											<Image
												source={{
													uri: "https://www.venuscinema.vn/temp/-uploaded-phim_captain_cr_500x700.jpg",
												}}
												style={{
													width: 100,
													aspectRatio: "2/3",
												}}
											/>
											<ThemedText
												style={{
													fontSize: 10,
													textTransform: "uppercase",
													width: 100,
													lineHeight: 14,
													textAlign: "center",
													marginTop: 8,
												}}
											>
												CAPTAIN AMERICA: THẾ GIỚI MỚI
											</ThemedText>
										</View>
										<View>
											{/* limit ages and duration  */}
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
													gap: 12,
												}}
											>
												<View
													style={{
														borderWidth: 1,
														borderColor: "red",
														width: 45,
														height: 25,
														alignItems: "center",
														justifyContent:
															"center",
													}}
												>
													<Text
														style={{
															textTransform:
																"uppercase",
															color: "yellow",
															fontSize: 12,
														}}
													>
														t13
													</Text>
												</View>
												<View
													style={{
														flexDirection: "row",
														alignItems: "center",
														gap: 4,
													}}
												>
													<Feather
														name="clock"
														color={Colors.icon}
													/>
													<Text
														style={{
															color: Colors.icon,
															fontSize: 12,
														}}
													>
														118分
													</Text>
												</View>
											</View>

											{/* time  */}
											<View>
												<FlatList
													data={Array(6).fill(null)}
													numColumns={4}
													contentContainerStyle={{
														gap: 10,
														marginTop: 14,
													}}
													columnWrapperStyle={{
														gap: 10,
													}}
													keyExtractor={(
														item,
														index
													) => index.toString()}
													renderItem={({
														item,
														index,
													}) => (
														<CustomTouchableOpacity
															style={{
																width: 70,
																borderWidth: 1,
																borderColor:
																	Colors.icon,
															}}
														>
															<View
																style={{
																	backgroundColor:
																		Colors.input,
																	height: 26,
																	justifyContent:
																		"center",
																	alignItems:
																		"center",
																}}
															>
																<ThemedText
																	style={{
																		fontSize: 14,
																	}}
																>
																	9:00
																</ThemedText>
															</View>
															<View
																style={{
																	height: 26,
																	justifyContent:
																		"center",
																	alignItems:
																		"center",
																}}
															>
																<ThemedText
																	style={{
																		fontSize: 10,
																	}}
																>
																	2D (PhụĐề)
																</ThemedText>
															</View>
														</CustomTouchableOpacity>
													)}
												/>
											</View>
										</View>
									</View>
								</>
							)}
						/>
					</Animated.View>
				</ProgressStep>
				<ProgressStep label="席指定" removeBtnRow>
					<Animated.View style={{ flex: 1 }} entering={FadeInRight}>
						<ThemedText
							style={{
								textAlign: "center",
								color: "white",
								opacity: 0.5,
								fontSize: 14,
							}}
						>
							席を指定してください
						</ThemedText>

						{/* note  */}
						<View
							style={{
								marginTop: 20,
								flexDirection: "row",
								gap: 30,
								marginHorizontal: "auto",
							}}
						>
							{seatStatus.map((item, index) => (
								<View
									key={index}
									style={{
										flexDirection: "row",
										gap: 6,
										alignItems: "center",
									}}
								>
									<View
										style={{
											backgroundColor: item.color,
											width: 30,
											height: 18,
											borderRadius: 4,
										}}
									/>
									<Text
										style={{ color: "white", opacity: 0.8 }}
									>
										{item.status}
									</Text>
								</View>
							))}
						</View>

						<View>
							{/* screen  */}
							<View
								style={{
									backgroundColor: Colors.input,
									alignItems: "center",
									justifyContent: "center",
									height: 40,
									borderTopStartRadius: 35,
									borderTopEndRadius: 35,
									marginTop: 20,
									marginBottom: 30,
								}}
							>
								<ThemedText style={{ color: Colors.icon }}>
									スクリーン
								</ThemedText>
							</View>
							{/* seat selection  */}
							<FlatList
								data={seatsData}
								keyExtractor={(item) => item.row}
								scrollEnabled={false}
								renderItem={({ item }) => (
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											marginVertical: 5,
										}}
									>
										<ThemedText
											style={{
												fontWeight: "bold",
											}}
										>
											{item.row}
										</ThemedText>
										<FlatList
											data={item.seats}
											keyExtractor={(seat) => seat.id}
											horizontal
											onLayout={(event) => {
												const { width } =
													event.nativeEvent.layout;
												setSeatAreaWidth(width);
											}}
											scrollEnabled={false}
											contentContainerStyle={{
												marginHorizontal:
													seatAreaMarginH,
												gap: seatGap,
											}}
											renderItem={({ item: seat }) => (
												<CustomTouchableOpacity
													onPress={() =>
														toggleSeatSelection(
															item.row,
															seat.number
														)
													}
													style={{
														width: seatWidth,
														height: 40,
														justifyContent:
															"center",
														alignItems: "center",
														backgroundColor:
															seat.isBooked
																? "#374151"
																: seat.isSelected
																? Colors.tint
																: "#6B7280",
														borderRadius: 5,
													}}
												>
													<Text
														style={{
															color: "white",
															fontSize: 12,
														}}
													>
														{seat.number}
													</Text>
												</CustomTouchableOpacity>
											)}
										/>
										<ThemedText
											style={{
												fontWeight: "bold",
											}}
										>
											{item.row}
										</ThemedText>
									</View>
								)}
							/>

							{/* selected seats  */}
							<View style={{ marginTop: 14 }}>
								<ThemedText>指定した席：</ThemedText>
								<ThemedText
									style={{ fontSize: 18, fontWeight: "500" }}
								>
									{`${
										getSelectedSeats().length > 0
											? getSelectedSeats()
											: "なし"
									}`}
								</ThemedText>
							</View>
						</View>
					</Animated.View>
				</ProgressStep>

				{/* 3  */}
				<ProgressStep label="確認" scrollable={false} removeBtnRow>
					<Animated.View style={{ flex: 1 }} entering={FadeInRight}>
						<ThemedText
							style={{
								textAlign: "center",
								color: "white",
								opacity: 0.5,
								fontSize: 14,
							}}
						>
							内容を確認してから、お支払いしてください
						</ThemedText>

						<View
							style={[
								{
									marginTop: 20,
								},
							]}
						>
							{/* movie info  */}
							<View style={{ flexDirection: "row", gap: 18 }}>
								<Image
									source={{
										uri: "https://www.venuscinema.vn/temp/-uploaded-phim_captain_cr_500x700.jpg",
									}}
									style={{
										width: 80,
										aspectRatio: "2/3",
									}}
								/>
								<View
									style={{
										marginTop: 8,
										flex: 1,
									}}
								>
									<ThemedText
										style={{
											fontSize: 18,
											textTransform: "uppercase",
										}}
									>
										CAPTAIN AMERICA: THẾ GIỚI MỚI
									</ThemedText>

									{/* limit ages  */}
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											gap: 12,
											marginTop: 16,
										}}
									>
										<View
											style={{
												borderWidth: 1,
												borderColor: "red",
												width: 45,
												height: 25,
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Text
												style={{
													textTransform: "uppercase",
													color: "yellow",
													fontSize: 12,
												}}
											>
												t13
											</Text>
										</View>
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
												gap: 4,
											}}
										>
											<Feather
												name="clock"
												color={Colors.icon}
											/>
											<Text
												style={{
													color: Colors.icon,
													fontSize: 12,
												}}
											>
												118分
											</Text>
										</View>
									</View>
								</View>
							</View>
							{/* booked time  */}
							<View style={{ marginTop: 20, gap: 8 }}>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										gap: 8,
									}}
								>
									<Ionicons
										name="calendar-outline"
										size={24}
										color={Colors.icon}
									/>
									<Text
										style={{
											color: Colors.icon,
											fontSize: 18,
										}}
									>
										日付:{" "}
										<Text
											style={{
												fontWeight: "600",
												color: tintColor,
											}}
										>
											2025/02/22
										</Text>
									</Text>
								</View>

								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										gap: 8,
									}}
								>
									<MaterialCommunityIcons
										name="movie-roll"
										size={24}
										color={Colors.icon}
									/>

									<Text
										style={{
											color: Colors.icon,
											fontSize: 18,
										}}
									>
										上映時間:{" "}
										<Text
											style={{
												fontWeight: "600",
												color: tintColor,
											}}
										>
											9:00
										</Text>
									</Text>
								</View>
								{/* booked seats  */}
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										gap: 8,
									}}
								>
									<MaterialCommunityIcons
										name="car-seat"
										size={24}
										color={Colors.icon}
									/>
									<Text
										style={{
											color: Colors.icon,
											fontSize: 18,
										}}
									>
										選択したシート:{" "}
										<Text
											style={{
												fontWeight: "600",
												color: tintColor,
											}}
										>
											E5, F6
										</Text>
									</Text>
								</View>
							</View>
						</View>

						{/* total money  */}
						<View
							style={{
								flexDirection: "row",
								marginTop: 18,
								borderTopWidth: StyleSheet.hairlineWidth,
								borderTopColor: Colors.icon,
								paddingTop: 20,
							}}
						>
							<Text
								style={{
									fontSize: 18,
									marginLeft: "auto",
									color: Colors.text,
								}}
							>
								会計：
								<Text
									style={{
										fontSize: 32,
										fontWeight: "500",
										color: tintColor,
									}}
								>
									¥1000
								</Text>
							</Text>
						</View>

						{/* confirm button  */}
						<Button
							style={{
								position: "absolute",
								bottom: 20,
								width: "100%",
							}}
							onPress={() => paymentSheetRef.current?.show()}
						>
							お支払いへ
						</Button>

						<ActionSheet
							ref={paymentSheetRef}
							gestureEnabled
							containerStyle={Styles.actionSheetContainer}
							indicatorStyle={Styles.actionSheetIndicator}
						>
							<View>
								<Text
									style={{
										fontSize: 24,
										color: Colors.text,
										textAlign: "center",
										marginTop: 10,
										fontWeight: "500",
									}}
								>
									お支払い
								</Text>

								<ThemedText
									style={{
										textAlign: "center",
										color: "white",
										opacity: 0.5,
										fontSize: 14,
										marginVertical: 10,
									}}
								>
									カードを選択してください
								</ThemedText>

								<View>
									{/* cart choices  */}
									<View style={{ gap: 10 }}>
										{cardInfos.length > 0 &&
											cardInfos.map((card, index) => (
												<Pressable
													key={index}
													style={{
														borderWidth: 1,
														borderColor:
															selectingCard ===
															index
																? tintColor
																: Colors.icon,
														borderRadius: 20,
														padding: 16,
														minHeight: 80,
														flexDirection: "row",
														alignItems: "center",
														justifyContent:
															"space-between",
														backgroundColor:
															selectingCard ===
															index
																? tintColor
																: "transparent",
													}}
													onPress={() =>
														setSelectingCard(index)
													}
												>
													<View
														style={{
															flex: 1,
															flexDirection:
																"row",
															alignItems:
																"center",
															gap: 10,
														}}
													>
														<Fontisto
															name={card.brand}
															size={50}
															color={
																selectingCard ===
																index
																	? "white"
																	: Colors.icon
															}
														/>
														<View>
															<ThemedText
																style={{
																	fontSize: 18,
																	fontWeight:
																		"600",
																	color:
																		selectingCard ===
																		index
																			? "white"
																			: Colors.text,
																}}
															>
																{card.type ==
																"credit"
																	? "クレジット"
																	: "デビット"}
															</ThemedText>
															<ThemedText
																style={{
																	fontSize: 16,
																	color:
																		selectingCard ===
																		index
																			? "white"
																			: Colors.icon,
																}}
															>
																{`********${card.number
																	.toString()
																	.slice(8)}`}
															</ThemedText>
														</View>
													</View>

													<View
														style={{
															width: 20,
															aspectRatio: "1/1",
															borderColor:
																selectingCard ===
																index
																	? "white"
																	: Colors.icon,
															borderWidth: 2,
															borderRadius: 100,
															padding: 2,
														}}
													>
														{selectingCard ===
															index && (
															<View
																style={{
																	flex: 1,
																	backgroundColor:
																		"white",
																	borderRadius: 100,
																}}
															/>
														)}
													</View>
												</Pressable>
											))}

										<CustomTouchableOpacity
											style={{
												marginHorizontal: "auto",
												marginVertical: 5,
												flexDirection: "row",
												justifyContent: "center",
												alignItems: "center",
												gap: 6,
											}}
											onPress={() =>
												setAddCardModalOpen(true)
											}
										>
											<Feather
												name="plus-circle"
												size={16}
												color={tintColor}
											/>
											<ThemedText
												style={{ color: tintColor }}
											>
												カードを追加
											</ThemedText>
										</CustomTouchableOpacity>
									</View>

									{/* total money  */}
									<View
										style={{
											flexDirection: "row",
											marginTop: 18,
											borderTopWidth:
												StyleSheet.hairlineWidth,
											borderTopColor: Colors.icon,
											paddingTop: 20,
										}}
									>
										<Text
											style={{
												fontSize: 18,
												marginLeft: "auto",
												color: Colors.text,
											}}
										>
											会計：
											<Text
												style={{
													fontSize: 32,
													fontWeight: "500",
													color: tintColor,
												}}
											>
												¥1000
											</Text>
										</Text>
									</View>
								</View>

								<View style={{ marginTop: 60, gap: 5 }}>
									<ThemedText
										style={{
											textAlign: "center",
											color: "white",
											opacity: 0.5,
											fontSize: 14,
											marginVertical: 10,
										}}
									>
										全ての情報を確認した上で、決済してください
									</ThemedText>
									<Button
										style={{ marginTop: 0 }}
										onPress={handlePayment}
										loading={paying}
									>
										決済
									</Button>
								</View>
							</View>

							{/* add card modal  */}
							<Modal
								visible={addCardModalOpen}
								animationType="slide"
								presentationStyle="fullScreen"
							>
								<View
									style={{
										flex: 1,
										backgroundColor:
											Colors.backgroundSecondary,
										paddingTop: insets.top,
									}}
								>
									{/* header  */}
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "space-between",
											paddingHorizontal:
												Dimentions.appPadding,
										}}
									>
										<CustomTouchableOpacity
											style={{
												width: 100,
											}}
											onPress={() =>
												setAddCardModalOpen(false)
											}
										>
											<ThemedText>キャンセル</ThemedText>
										</CustomTouchableOpacity>
										<ThemedText
											style={{
												fontSize: 18,
												fontWeight: "600",
											}}
										>
											カード追加
										</ThemedText>
										<CustomTouchableOpacity
											style={{
												width: 100,
												flexDirection: "row",
												justifyContent: "flex-end",
											}}
											onPress={() =>
												setAddCardModalOpen(false)
											}
										>
											<ThemedText
												style={{
													fontWeight: "600",
													color: tintColor,
												}}
											>
												追加
											</ThemedText>
										</CustomTouchableOpacity>
									</View>

									{/* body  */}
									<View
										style={{
											padding: Dimentions.appPadding,
											flex: 1,
										}}
									>
										{/* card info  */}
										<View style={{ gap: 20 }}>
											<View>
												<FormLabel>氏名</FormLabel>
												<FormInput placeholder="カードの氏名" />
											</View>
											<View>
												<FormLabel>
													カード番号
												</FormLabel>
												<FormInput
													placeholder="カード番号"
													keyboardType="number-pad"
													maxLength={12}
													inputMode="numeric"
													onChangeText={(text) => {
														const value =
															text.replace(
																/[^0-9]/g,
																""
															);
														setCardNumber(value);
													}}
													value={cardNumber}
												/>
											</View>
											<View
												style={{
													flexDirection: "row",
													gap: 20,
												}}
											>
												<View style={{ flex: 1 }}>
													<FormLabel>期限</FormLabel>
													<FormInput
														placeholder="MM/YY"
														keyboardType="numeric"
														maxLength={5}
														value={expirationDate}
														onChangeText={
															handleTextChange
														}
													/>
												</View>
												<View style={{ flex: 1 }}>
													<FormLabel>CVV</FormLabel>
													<FormInput
														placeholder="CVV"
														keyboardType="numeric"
														maxLength={3}
														onChangeText={(text) =>
															setCvv(
																text.replace(
																	/[^0-9]/g,
																	""
																)
															)
														}
														value={cvv}
													/>
												</View>
											</View>
										</View>

										{/* button  */}
										<Button
											style={{
												marginTop: "auto",
												marginBottom: 20,
											}}
											onPress={() =>
												setAddCardModalOpen(false)
											}
										>
											カードを追加
										</Button>
									</View>
								</View>
							</Modal>

							{/* payment success modal  */}
							<Modal
								visible={successModalOpen}
								animationType="fade"
								presentationStyle="overFullScreen"
								transparent
							>
								<View
									style={{
										flex: 1,
										position: "relative",
									}}
								>
									<View
										style={{
											position: "absolute",
											inset: 0,
											backgroundColor: "black",
											opacity: 0.5,
										}}
									/>

									{/* success box  */}
									<View
										style={{
											width: width / 1.5,
											aspectRatio: "1/1",
											backgroundColor: "white",
											borderRadius: 30,
											top: "50%",
											left: "50%",
											transform: [
												{ translateX: -width / 3 },
												{ translateY: -width / 3 },
											],
											padding: 20,
										}}
									>
										<LottieView
											ref={animationRef}
											loop={false}
											source={require("./../assets/images/successAnimJson.json")}
											style={{
												width: width / 2.4,
												aspectRatio: "1/1",
												marginHorizontal: "auto",
											}}
										/>
										<Button
											style={{ marginTop: "auto" }}
											onPress={() => {
												setSuccessModalOpen(false);
												paymentSheetRef.current?.hide();
												replace("/myTickets");
											}}
										>
											チケット画面へ
										</Button>
									</View>

									{/* <Button
										onPress={() =>
											setSuccessModalOpen(false)
										}
									>
										Close
									</Button> */}
								</View>
							</Modal>
						</ActionSheet>
					</Animated.View>
				</ProgressStep>
			</ProgressSteps>

			{/* next button  */}
			{activeStep >= 0 && activeStep <= 1 && (
				<Pressable
					onPress={() => {
						if (activeStep >= 0 && activeStep < 2) {
							setActiveStep(activeStep + 1);
						} else if (activeStep == 2) {
							console.log("complete");
						}
					}}
					style={[
						{
							position: "absolute",
							bottom: 20,
							right: 20,
							backgroundColor: tintColor,
							width: 60,
							aspectRatio: "1/1",
							justifyContent: "center",
							alignItems: "center",
							borderRadius: 1000,
						},
						Styles.shadow,
					]}
				>
					<AntDesign name="arrowright" size={30} color="white" />
				</Pressable>
			)}

			{/* prev button  */}
			{activeStep > 0 && activeStep <= 1 && (
				<Pressable
					onPress={() => {
						setActiveStep(activeStep - 1);
					}}
					style={[
						{
							position: "absolute",
							bottom: 20,
							left: 20,
							backgroundColor: tintColor,
							width: 60,
							aspectRatio: "1/1",
							justifyContent: "center",
							alignItems: "center",
							borderRadius: 1000,
						},
						Styles.shadow,
					]}
				>
					<AntDesign name="arrowleft" size={30} color="white" />
				</Pressable>
			)}
		</View>
	);
};

const cardInfos: {
	name: string;
	number: number;
	expiry: string;
	cvc: number;
	brand: "jcb" | "visa";
	type: "credit" | "debit";
}[] = [
	{
		name: "John Doe",
		number: 111122220912,
		expiry: "12/25",
		cvc: 123,
		brand: "jcb",
		type: "debit",
	},
	{
		name: "Alice Doe",
		number: 444455551312,
		expiry: "12/25",
		cvc: 123,
		brand: "visa",
		type: "credit",
	},
];

export default BookTicket;
