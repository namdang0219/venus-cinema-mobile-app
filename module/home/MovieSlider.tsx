import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { Dimentions } from "@/constants/Dimentions";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import useSWR from "swr";
import NoData from "../NoData";
import { fetcher } from "@/utils/func/fetcher";
import { MovieType } from "@/utils/types/MovieType";
import { Entypo } from "@expo/vector-icons";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import { Styles } from "@/constants/Styles";
import { useRouter } from "expo-router";

const MovieSlider = () => {
	const scrollOffsetValue = useSharedValue<number>(0);
	const ref = React.useRef<ICarouselInstance>(null);
	const { push } = useRouter();

	const { data } = useSWR(
		`${process.env.EXPO_PUBLIC_API_URL}/movies?populate=banner&filters[movie_status]=NowShowing&sort=updatedAt:desc&pagination[start]=0&pagination[limit]=3`,
		fetcher
	);

	if (data && data.data.length === 0) return <NoData />;

	const dataList = data?.data;

	function next() {
		ref.current?.next();
	}

	function prev() {
		ref.current?.prev();
	}

	return (
		<View style={{ position: "relative" }}>
			<Carousel
				ref={ref}
				testID={"xxx"}
				loop={true}
				width={Dimentions.window.width}
				height={(Dimentions.window.width / 16) * 9}
				snapEnabled={true}
				pagingEnabled={false}
				autoPlayInterval={3000}
				autoPlay
				scrollAnimationDuration={1500}
				data={dataList}
				defaultScrollOffsetValue={scrollOffsetValue}
				style={{ width: "100%" }}
				renderItem={({ item }: { item: MovieType }) => (
					<CustomTouchableOpacity
						onPress={() => push(`/detail/${item?.documentId}`)}
					>
						{item?.banner && (
							<Image
								source={{
									uri: item?.banner.uri,
								}}
								style={styles.image}
							/>
						)}
					</CustomTouchableOpacity>
				)}
			/>

			{/* arrow */}
			<CustomTouchableOpacity
				onPress={next}
				style={[
					{
						position: "absolute",
						top: "50%",
						right: 6,
						transform: [{ translateY: -12 }],
						opacity: 0.65,
					},
					Styles.shadow,
				]}
			>
				<Entypo name="chevron-thin-right" color={"white"} size={24} />
			</CustomTouchableOpacity>

			<CustomTouchableOpacity
				onPress={prev}
				style={[
					{
						position: "absolute",
						top: "50%",
						left: 6,
						transform: [{ translateY: -12 }],
						opacity: 0.65,
					},
					Styles.shadow,
				]}
			>
				<Entypo name="chevron-thin-left" color={"white"} size={24} />
			</CustomTouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: Dimentions.window.width,
		aspectRatio: "16/10",
		backgroundColor: "gray",
	},
});

export default MovieSlider;
