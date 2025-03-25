import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import HorizontalListLayout from "@/components/layout/HorizontalListLayout";
import { useRouter } from "expo-router";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Dimentions } from "@/constants/Dimentions";
import { fetcher } from "@/utils/func/fetcher";
import useSWR from "swr";
import { CampaignType } from "@/utils/types/CampaignType";

const campainItemWidth = Dimentions.window.width - Dimentions.appPadding * 3;

const MemberCampain = () => {
	const { push } = useRouter();

	const { data } = useSWR(
		`${process.env.EXPO_PUBLIC_API_URL}/campaigns?populate=poster&filters[type]=membership`,
		fetcher
	);

	const campainData = data?.data as CampaignType[];

	if (!campainData)
		return (
			<ThemedText style={{ paddingHorizontal: Dimentions.appPadding }}>
				データが読み込めませんでした！
			</ThemedText>
		);

	return (
		<HorizontalListLayout
			title="会員キャンペーン"
			rightButtonAction={() => {}}
			listItems={campainData}
			customItem={(item: CampaignType) => (
				<View style={styles.container}>
					<CustomTouchableOpacity
						onPress={() => push(`/campaign/${item.documentId}`)}
					>
						<Image
							source={{
								uri: item?.poster.uri,
							}}
							style={styles.banner}
						/>
					</CustomTouchableOpacity>
					<View style={styles.bottomContainer}>
						<ThemedText numberOfLines={2} style={styles.title}>
							{item.title}
						</ThemedText>
						<CustomTouchableOpacity
							style={styles.button}
							onPress={() => push(`/campaign/${item.documentId}`)}
						>
							<Text style={styles.buttonText}>見る</Text>
						</CustomTouchableOpacity>
					</View>
				</View>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	container: { width: campainItemWidth, gap: 10 },
	banner: {
		width: campainItemWidth,
		aspectRatio: "2/0.95",
		borderRadius: 5,
	},
	bottomContainer: {
		flexDirection: "row",
		gap: 10,
	},
	title: {
		flex: 1,
		textTransform: "uppercase",
	},
	button: {
		backgroundColor: Colors.dark.tint,
		height: 34,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 1000,
		width: 50,
	},
	buttonText: {
		color: "white",
		fontWeight: "500",
	},
});

export default MemberCampain;
