import {
	View,
	useWindowDimensions,
	Share,
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
import Markdown from "react-native-markdown-display";
import useSWR from "swr";
import { fetcher } from "@/utils/func/fetcher";
import { CampaignType } from "@/utils/types/CampaignType";

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
				backgroundColor: Colors.background,
			},
			headerTintColor: Colors.tint,
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
					<EvilIcons
						name="share-apple"
						size={30}
						color={Colors.tint}
					/>
				</CustomTouchableOpacity>
			),
		});
	}, []);

	const { data } = useSWR(
		`${process.env.EXPO_PUBLIC_API_URL}/campaigns/${campaignId}?populate=poster`,
		fetcher
	);

	if (!data) return <></>;

	const campaignData: CampaignType = data?.data;

	return (
		<ScrollView
			style={{
				flex: 1,
				backgroundColor: Colors.backgroundSecondary,
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
							source={{ uri: campaignData?.poster.uri }}
							width={width - Dimentions.appPadding * 2}
						/>
					</Pressable>
					<CustomImageViewer
						images={[{ url: campaignData?.poster.uri }]}
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
					{campaignData?.content ?? 'データがありません！'}
				</Markdown>
			</View>
		</ScrollView>
	);
};

export default CampaignScreen;
