import {
	View,
	useWindowDimensions,
	Share,
	Text,
	StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ScrollView, Pressable } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { Dimentions } from "@/constants/Dimentions";
import PostHeader from "@/module/PostHeader";
import { AutoHeightImage } from "@/components/image/AutoHeightImage";
import CustomImageViewer from "@/components/custom/CustomImageViewer";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import { EvilIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import Markdown from "react-native-markdown-display";
import useSWR from "swr";
import { fetcher } from "@/utils/func/fetcher";

const CampaignScreen = () => {
	const { campaignId } = useLocalSearchParams();
	const { setOptions } = useNavigation();
	const { width } = useWindowDimensions();
	const [showImage, setShowImage] = useState<boolean>(false);

	// set options for screen header
	useEffect(() => {
		setOptions({
			headerTitle: "キャンペーン詳細",
			headerBackTitle: 'ホーム',
			headerStyle: {
				backgroundColor: Colors["dark"].background,
			},
			headerTintColor: Colors["dark"].tint,
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
							{ tintColor: Colors["dark"].tint }
						)
					}
				>
					<EvilIcons
						name="share-apple"
						size={30}
						color={Colors["dark"].tint}
					/>
				</CustomTouchableOpacity>
			),
		});
	}, []);

	const { data } = useSWR(
		`${process.env.EXPO_PUBLIC_API_URL}/membership-campaigns/${campaignId}?populate[0]=image`,
		fetcher
	);

	if (!data) return <></>;

	const campaignData = data?.data;

	return (
		<ScrollView
			style={{
				flex: 1,
				backgroundColor: Colors["dark"].backgroundSecondary,
				paddingHorizontal: Dimentions.appPadding,
				paddingTop: 20,
			}}
		>
			<PostHeader title={campaignData?.title} />

			{/* post content */}
			<View>
				<View style={{ marginVertical: 20 }}>
					<Pressable onPress={() => setShowImage(true)}>
						<AutoHeightImage
							source={{ uri: campaignData?.image.uri }}
							width={width - Dimentions.appPadding * 2}
						/>
					</Pressable>
					<CustomImageViewer
						images={[{ url: campaignData?.image.uri }]}
						visible={showImage}
						setIsVisible={setShowImage}
					/>
				</View>

				<Markdown
					style={{
						text: { color: "white" },
						bullet_list: {
							color: "white",
						},
						bullet_list_icon: {
							marginLeft: 4,
							marginRight: 4,
						},
					}}
				>
					{campaignData?.content}
				</Markdown>
			</View>
		</ScrollView>
	);
};

export default CampaignScreen;
