import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import HorizontalListLayout from "@/components/layout/HorizontalListLayout";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Dimentions } from "@/constants/Dimentions";
import { fetcher } from "@/utils/func/fetcher";
import { CampaignType } from "@/utils/types/CampaignType";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import useSWR from "swr";

const campainItemWidth = Dimentions.window.width - Dimentions.appPadding * 3;

const StoreCampain = () => {
	const { push } = useRouter();

	const { data } = useSWR(
		`${process.env.EXPO_PUBLIC_API_URL}/campaigns?populate[0]=poster&filters[type]=store`,
		fetcher
	);

	const campainData: CampaignType[] = data?.data;

	if (!campainData)
		return (
			<ThemedText style={{ paddingHorizontal: Dimentions.appPadding }}>
				データが読み込めませんでした！
			</ThemedText>
		);

	return (
		<HorizontalListLayout
			title="セール"
			rightButtonAction={() => {}}
			listItems={campainData}
			customItem={(item: CampaignType) => (
				<View style={{ width: campainItemWidth, gap: 10 }}>
					<CustomTouchableOpacity
						onPress={() => push(`/campaign/${item.documentId}`)}
					>
						{item?.poster.uri && (
							<Image
								source={{
									uri: item?.poster.uri,
								}}
								style={{
									width: campainItemWidth,
									aspectRatio: "2/1.35",
									borderRadius: 5,
								}}
							/>
						)}
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
								{item?.title}
							</ThemedText>
							<ThemedText
								numberOfLines={2}
								style={{
									fontSize: 14,
									opacity: 0.6,
								}}
							>
								{item?.content}
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
								onPress={() =>
									push(`/campaign/${item.documentId}`)
								}
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
