import { View, Image } from "react-native";
import React, { FC, ReactNode } from "react";
import { Dimentions } from "@/constants/Dimentions";
import { ThemedText } from "../ThemedText";
import { FlatList } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";

const itemWidth = Dimentions.window.width / 2.6;

type HorizontalListLayoutProps = {
	title: string;
	rightButton?: boolean;
	rightButtonAction: () => void;
	listItems: any[];
	customItem?: ReactNode | null;
};

const HorizontalListLayout: FC<HorizontalListLayoutProps> = ({
	title = "",
	rightButton = true,
	rightButtonAction = () => {},
	listItems = [],
	customItem = null,
}) => {
	const { push } = useRouter();

	return (
		<View style={{ gap: 12 }}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					paddingHorizontal: Dimentions.appPadding,
				}}
			>
				<ThemedText type="subtitle">{title}</ThemedText>

				{rightButton && (
					<CustomTouchableOpacity onPress={rightButtonAction}>
						<ThemedText type="link">すべて</ThemedText>
					</CustomTouchableOpacity>
				)}
			</View>
			<FlatList
				data={listItems}
				horizontal
				contentContainerStyle={{
					paddingLeft: Dimentions.appPadding,
					gap: 15,
				}}
				keyExtractor={(item, index) => index.toString()}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item, index }) => (
					<>
						{!customItem ? (
							<View style={{ width: itemWidth }}>
								<CustomTouchableOpacity
									onPress={() => push("/detail/1")}
								>
									<Image
										source={{
											uri: "https://www.venuscinema.vn/temp/-uploaded-phim_yeu-nham_cr_250x350.jpg",
										}}
										style={{
											width: itemWidth,
											aspectRatio: "3/4.2",
											borderRadius: 5,
										}}
									/>
									<ThemedText
										type="defaultSemiBold"
										style={{
											marginTop: 6,
											fontSize: 14,
										}}
										numberOfLines={2}
									>
										{`Yêu nhầm bạn thân (2019)`}
									</ThemedText>
								</CustomTouchableOpacity>
								<CustomTouchableOpacity
									style={{
										backgroundColor: Colors.dark.tint,
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
						) : (
							customItem
						)}
					</>
				)}
			/>
		</View>
	);
};

export default HorizontalListLayout;
