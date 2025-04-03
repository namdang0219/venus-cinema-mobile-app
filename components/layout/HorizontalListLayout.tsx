import { View, Image } from "react-native";
import React, { FC, Fragment, ReactNode } from "react";
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
	customItem?: (item: any) => React.ReactNode;
};

const HorizontalListLayout: FC<HorizontalListLayoutProps> = ({
	title = "",
	rightButton = true,
	rightButtonAction = () => {},
	listItems = [],
	customItem,
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
									onPress={() =>
										push(`/detail/${item.documentId}`)
									}
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
												backgroundColor:
													Colors.input,
											}}
										/>
									)}
									<ThemedText
										type="defaultSemiBold"
										style={{
											marginTop: 6,
											fontSize: 14,
											height: 52
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
						) : (
							<>{customItem(item)}</>
						)}
					</>
				)}
			/>
		</View>
	);
};

export default HorizontalListLayout;
