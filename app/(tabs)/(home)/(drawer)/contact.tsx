import { View, Text } from "react-native";
import React, { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedText } from "@/components/ThemedText";
import { Dimentions } from "@/constants/Dimentions";
import { Colors } from "@/constants/Colors";
import {
	FontAwesome5,
	FontAwesome6,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import FormLabel from "@/components/label/FormLabel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormInput from "../../../../components/input/FormInput";

const ContactScreen = () => {
	const contactSheetRef = useRef<ActionSheetRef>(null);
	const insets = useSafeAreaInsets();

	return (
		<ScrollView
			style={{
				flex: 1,
				paddingHorizontal: Dimentions.appPadding,
				paddingTop: 20,
			}}
		>
			<View style={{ flexDirection: "row", gap: 10 }}>
				<View
					style={{ width: 4, backgroundColor: Colors["dark"].tint }}
				></View>
				<ThemedText
					type="title"
					style={{ fontSize: 26, lineHeight: 36, flex: 1 }}
				>
					連絡先
				</ThemedText>
			</View>

			{/* contact info */}
			<View style={{ marginTop: 14, marginHorizontal: 14 }}>
				<Text
					style={{
						color: Colors.dark.tint,
						textTransform: "uppercase",
						fontSize: 18,
					}}
				>
					VENUS CINEMA HẢI DƯƠNG
				</Text>

				<View style={{ marginTop: 10, gap: 4 }}>
					{/* location  */}
					<View style={{ flexDirection: "row", gap: 10 }}>
						<FontAwesome6
							name="location-dot"
							color="white"
							size={16}
							style={{
								transform: [{ translateY: 4 }],
								width: 16,
							}}
						/>
						<ThemedText
							type="default"
							style={{ fontSize: 14, flex: 1 }}
						>
							Địa chỉ : 363 Nguyễn Văn Linh, P. Phạm Ngũ Lão, TP
							Hải Dương
						</ThemedText>
					</View>

					{/* phone number */}
					<View style={{ flexDirection: "row", gap: 10 }}>
						<FontAwesome5
							name="phone-alt"
							color="white"
							size={14}
							style={{
								transform: [{ translateY: 4 }],
								width: 16,
							}}
						/>
						<ThemedText
							type="default"
							style={{ fontSize: 14, flex: 1 }}
						>
							Điện thoại: 090442****
						</ThemedText>
					</View>

					{/* web */}
					<View style={{ flexDirection: "row", gap: 10 }}>
						<MaterialCommunityIcons
							name="web"
							color="white"
							size={16}
							style={{
								transform: [{ translateY: 4 }],
								width: 16,
							}}
						/>
						<ThemedText
							type="default"
							style={{ fontSize: 14, flex: 1 }}
						>
							Website: www.venuscinema.vn
						</ThemedText>
					</View>
				</View>

				<View style={{ flexDirection: "row", marginTop: 14 }}>
					<CustomTouchableOpacity
						style={{
							backgroundColor: Colors.dark.tint,
							height: 35,
							paddingHorizontal: 14,
							borderRadius: 8,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() => contactSheetRef.current?.show()}
					>
						<Text style={{ color: "white", fontWeight: "500" }}>
							メッセージする
						</Text>
					</CustomTouchableOpacity>
				</View>
			</View>

			{/* actions sheet  */}
			<ActionSheet
				ref={contactSheetRef}
				containerStyle={{
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					backgroundColor: Colors.dark.background,
					paddingBottom: insets.bottom,
					paddingHorizontal: Dimentions.appPadding,
				}}
				gestureEnabled
				indicatorStyle={{
					backgroundColor: "white",
					opacity: 0.5,
					height: 4,
				}}
			>
				<View style={{ gap: 12 }}>
					<View>
						<FormLabel>氏名：</FormLabel>
						<FormInput placeholder="氏名を入力..." />
					</View>
					<View>
						<FormLabel>電話番号：</FormLabel>
						<FormInput placeholder="電話番号を入力..." />
					</View>
					<View>
						<FormLabel>住所：</FormLabel>
						<FormInput placeholder="住所を入力..." />
					</View>
					<View>
						<FormLabel>メール：</FormLabel>
						<FormInput placeholder="メールを入力..." />
					</View>
					<View>
						<FormLabel>内容：</FormLabel>
						<FormInput
							placeholder="氏名を入力..."
							multiline
							numberOfLines={4}
							style={{ height: "auto" }}
						/>
					</View>

					<CustomTouchableOpacity
						style={{
							marginTop: 18,
							backgroundColor: Colors.dark.tint,
							height: 48,
							justifyContent: "center",
							alignItems: "center",
							borderRadius: 10,
						}}
						onPress={() => contactSheetRef.current?.hide()}
					>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "500",
								color: "white",
							}}
						>
							送信
						</Text>
					</CustomTouchableOpacity>
				</View>
			</ActionSheet>
		</ScrollView>
	);
};

export default ContactScreen;
