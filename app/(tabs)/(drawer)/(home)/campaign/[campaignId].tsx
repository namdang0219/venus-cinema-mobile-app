import { View, useWindowDimensions, Share } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ScrollView, Pressable } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { Dimentions } from "@/constants/Dimentions";
import PostHeader from "@/module/PostHeader";
import { AutoHeightImage } from "@/components/image/AutoHeightImage";
import CustomImageViewer from "@/components/custom/CustomImageViewer";
import { ThemedText } from "../../../../../components/ThemedText";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import { EvilIcons } from "@expo/vector-icons";

const CampaignScreen = () => {
	const { campaignId } = useLocalSearchParams();
	const { setOptions } = useNavigation();
	const { width } = useWindowDimensions();
	const [showImage, setShowImage] = useState<boolean>(false);

	useEffect(() => {
		setOptions({
			headerTitle: "キャンペーン詳細",
			headerBackTitle: "戻る",
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

	const postImageUrl =
		"https://www.venuscinema.vn/uploaded/THE-THANH-VIEN-TICH-DIEM-DOI-QUA(1).png";

	return (
		<ScrollView
			style={{
				flex: 1,
				backgroundColor: Colors["dark"].backgroundSecondary,
				paddingHorizontal: Dimentions.appPadding,
				paddingTop: 20,
			}}
		>
			<PostHeader title="THẺ THÀNH VIÊN - TÍCH ĐIỂM ĐỔI QUÀ" />

			{/* post content */}
			<View>
				<View style={{ marginVertical: 20 }}>
					<Pressable onPress={() => setShowImage(true)}>
						<AutoHeightImage
							source={{ uri: postImageUrl }}
							width={width - Dimentions.appPadding * 2}
							style={{}}
						/>
					</Pressable>
					<CustomImageViewer
						images={[{ url: postImageUrl }]}
						visible={showImage}
						setIsVisible={setShowImage}
					/>
				</View>

				<View style={{ gap: 14, paddingBottom: 20 }}>
					<View>
						<ThemedText>
							Nhằm tối ưu hóa quyền lợi của khách hàng. Venus xin
							cung cấp tới các bạn chương trình: thẻ thành viên -
							tích điểm đổi quà. Chỉ cần vài thao tác đơn giản bạn
							đã có thể trở thành một thành viên của Venus Cinema.
						</ThemedText>
					</View>

					{/* step 1  */}
					<View>
						<ThemedText
							style={{
								fontWeight: "600",
								fontSize: 18,
								marginBottom: 4,
							}}
						>
							Bước 1: Đăng kí tài khoản
						</ThemedText>
						<ThemedText>
							- Khách hàng có thể dễ dàng đăng kí tài khoản miễn
							phí trên website
							https://www.venuscinema.vn/register/
							{`\n`}- Vui lòng kiểm tra và đảm bảo thông tin cá
							nhân chính xác trước khi hoàn tất đăng ký tài khoản.
							Tất cả thông tin ngoại trừ mật khẩu sẽ không thể
							chỉnh sửa sau khi đăng ký.
							{`\n`}-Tài khoản thành viên có thể sử dụng ngay sau
							khi đăng ký.
						</ThemedText>
					</View>

					{/* step 2 */}
					<View>
						<ThemedText
							style={{
								fontWeight: "600",
								fontSize: 18,
								marginBottom: 4,
							}}
						>
							Bước 2: Cấp thẻ thành viên
						</ThemedText>
						<ThemedText>
							Khi đăng ký là thành viên của Venuscinema các bạn sẽ
							được cấp thẻ Thành Viên của Rạp mỗi thẻ tương ứng
							với một mã khác nhau và được cấp miễn phí tại quầy.
						</ThemedText>
					</View>

					{/* step 3 */}
					<View>
						<ThemedText
							style={{
								fontWeight: "600",
								fontSize: 18,
								marginBottom: 4,
							}}
						>
							Bước 3: Tích điểm
						</ThemedText>
						<ThemedText>
							- Thẻ sẽ được tích điểm thông qua mỗi lần khách hàng
							mua vé xem phim tại rạp hoặc mua vé online ( 1000đ =
							1đ)
							{`\n`}- Khi mua vé trực tiếp tại rạp, khách hàng
							xuất trình thẻ thành viên chính chủ cho nhân viên
							quầy để được tích điểm.
							{`\n`}- Khách hàng có thẻ thành viên khi mua vé
							online, hệ thống sẽ tự động tích điểm.
						</ThemedText>
					</View>

					{/* step 4 */}
					<View>
						<ThemedText
							style={{
								fontWeight: "600",
								fontSize: 18,
								marginBottom: 4,
							}}
						>
							Bước 4: Đổi quà hấp dẫn
						</ThemedText>
						<ThemedText>
							Khi mà số điểm đạt tới mốc quy định thì khách hàng
							có thể đổi sang nhiều phần quà hấp dẫn khác nhau.
							Mức điểm càng cao ưu đãi càng lớn.
						</ThemedText>
						<ThemedText>
							・40 điểm = 1 Nước
							{`\n`}・60 điểm = 1 Bắp
							{`\n`}・80 điểm = 1 Combo 1{`\n`}・100 điểm = 1
							Combo 2{`\n`}・150 điểm = 1 vé 2D
							{`\n`}・170 điểm = 1 vé 3D
						</ThemedText>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default CampaignScreen;
