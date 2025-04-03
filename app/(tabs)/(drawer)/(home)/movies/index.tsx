import { View, FlatList, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import useSWR from "swr";
import NoData from "@/module/NoData";
import { fetcher } from "@/utils/func/fetcher";
import { MovieType } from "@/utils/types/MovieType";
import { Colors } from "@/constants/Colors";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import { ThemedText } from "@/components/ThemedText";
import { Dimentions } from "@/constants/Dimentions";

type Type = "NowShowing";

const itemWidth =
	(Dimentions.window.width - Dimentions.appPadding * 2 - 10) / 2;

const AllMoviesScreen = () => {
	const params = useLocalSearchParams();
	const type = params?.type as Type;
	const { setOptions } = useNavigation();
	const { push } = useRouter();

	const headerTitle = type === "NowShowing" ? "上映中" : "公開予定";

	useEffect(() => {
		setOptions({
			title: headerTitle,
			headerTintColor: Colors.tint,
			headerBackButtonDisplayMode: "minimal",
		});
	}, []);

	const { data } = useSWR(
		`${process.env.EXPO_PUBLIC_API_URL}/movies?populate=poster&filters[movie_status]=${type}`,
		fetcher
	);

	const movieDatas: MovieType[] = data?.data;

	if (!data) return <NoData />;

	return (
		<FlatList
			data={movieDatas}
			keyExtractor={(item) => String(item?.documentId)}
			contentContainerStyle={{
				paddingTop: 10,
				paddingBottom: 100,
				paddingHorizontal: Dimentions.appPadding,
				gap: 10,
				rowGap: 24,
			}}
			numColumns={2}
			columnWrapperStyle={{
				gap: 10,
			}}
			renderItem={({ item, index }) => (
				<View style={{ width: itemWidth }}>
					<CustomTouchableOpacity
						onPress={() => push(`/detail/${item?.documentId}`)}
					>
						{item?.poster && (
							<Image
								source={{
									uri: item?.poster.uri,
								}}
								style={{
									width: itemWidth,
									aspectRatio: "3/4.2",
									borderRadius: 5,
									backgroundColor: Colors.input,
								}}
							/>
						)}
						<ThemedText
							type="defaultSemiBold"
							style={{
								marginTop: 6,
								fontSize: 14,
								height: 52,
							}}
							numberOfLines={2}
						>
							{`${item?.title} (${new Date(
								item?.releaseDate
							).getFullYear()})`}
						</ThemedText>
					</CustomTouchableOpacity>
					<CustomTouchableOpacity
						style={{
							backgroundColor: Colors.tint,
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
	);
};

export default AllMoviesScreen;
