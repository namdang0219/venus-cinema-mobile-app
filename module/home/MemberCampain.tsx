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

const campainItemWidth = Dimentions.window.width - Dimentions.appPadding * 3;

const MemberCampain = () => {
	const { push } = useRouter();

	const { data } = useSWR(
		`${process.env.EXPO_PUBLIC_API_URL}/membership-campaigns`,
		fetcher
	);

	const campainData = data?.data;

	if (!campainData) return <></>;

	return (
		<HorizontalListLayout
			title="会員キャンペーン"
			rightButtonAction={() => {}}
			listItems={campainData}
			customItem={(item) => (
				<View style={styles.container}>
					<CustomTouchableOpacity
						onPress={() => push(`/campaign/${item.documentId}`)}
					>
						<Image
							source={{
								uri: "https://www.venuscinema.vn/temp/-uploaded-khuyen-mai-uu-dai_THE-THANH-VIEN-TICH-DIEM-DOI-QUA_cr_590x270.png",
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
							onPress={() => push("/campaign/1")}
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
