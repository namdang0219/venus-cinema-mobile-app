import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import HorizontalListLayout from "@/components/layout/HorizontalListLayout";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Dimentions } from "@/constants/Dimentions";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const campainItemWidth = Dimentions.window.width - Dimentions.appPadding * 3;

const StoreCampain = () => {
	const { push } = useRouter();

	return (
		<HorizontalListLayout
			title="セール"
			rightButtonAction={() => {}}
			listItems={Array(3).fill(null)}
			customItem={() => (
				<View style={{ width: campainItemWidth, gap: 10 }}>
					<CustomTouchableOpacity onPress={() => push("/campaign/1")}>
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
								Ưu đãi đã khi xem phim dài, combo 1 với giá chỉ
								70K gồm 1 nước lớn + 1 bắp lớn (chỉ áp dụng với
								nước uống , Pepsi, 7UP, Mirinda)
							</ThemedText>
						</View>
						<View style={{ flexDirection: "row" }}>
							<CustomTouchableOpacity
								style={{
									backgroundColor: Colors.dark.tint,
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
	);
};

export default StoreCampain;
