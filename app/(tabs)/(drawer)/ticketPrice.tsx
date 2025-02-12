import { View, Modal } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import { Dimentions } from "@/constants/Dimentions";
import { Colors } from "@/constants/Colors";
import { AutoHeightImage } from "@/components/image/AutoHeightImage";
import ImageViewer from "react-native-image-zoom-viewer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import CustomTouchableOpacity from "@/components/custom/CustomTouchableOpacity";
import CustomImageViewer from "@/components/custom/CustomImageViewer";

const TicketPriceScreen = () => {
	const [imageModal, setImageModal] = useState<boolean>(false);

	const priceImageUri =
		"https://www.venuscinema.vn/uploaded/bang-gia-ve-rap-venus-hai-duong-2025.jpg";

	const images = [
		{
			url: priceImageUri,
		},
	];

	return (
		<ScrollView
			style={{
				flex: 1,
				paddingHorizontal: Dimentions.appPadding,
				paddingTop: 20,
				backgroundColor: Colors["dark"].backgroundSecondary,
			}}
		>
			<View style={{ marginBottom: 16 }}>
				<View style={{ flexDirection: "row", gap: 14 }}>
					<View
						style={{ backgroundColor: Colors.dark.tint, width: 4 }}
					/>
					<ThemedText
						type="title"
						style={{ fontSize: 26, lineHeight: 36, flex: 1 }}
					>
						Nội dung quy 
					</ThemedText>
				</View>
				<ThemedText
					type="default"
					style={{
						fontStyle: "italic",
						fontSize: 14,
						opacity: 0.5,
						marginTop: 2,
					}}
				>
					(Áp dụng từ 01/01/2021)
				</ThemedText>
			</View>

			{/* image  */}
			<>
				<Pressable onPress={() => setImageModal(true)}>
					<AutoHeightImage
						width={
							Dimentions.window.width - Dimentions.appPadding * 2
						}
						style={{ backgroundColor: Colors.dark.input }}
						source={{
							uri: "https://www.venuscinema.vn/uploaded/bang-gia-ve-rap-venus-hai-duong-2025.jpg",
						}}
					/>
				</Pressable>
				<CustomImageViewer
					images={images}
					visible={imageModal}
					setIsVisible={setImageModal}
				/>
			</>

			<View style={{ paddingBottom: 50, marginTop: 20 }}>
				<ThemedText>
					Tuân thủ quy định độ tuổi theo từng phim của Cục Điện Ảnh.
					{"\n"}
					{"\n"}
					Trẻ em thấp hơn 0.7 mét không được vào rạp, nếu người lớn
					vẫn cam kết rằng "trẻ sẽ không làm ảnh hưởng tới phòng
					phim", nhân viên Rạp sẽ quyết định cho vào hoặc không, nếu
					được vào xem và làm ảnh hưởng đến chất lượng suất chiếu
					(khóc, nói, quấy...), Venus sẽ mời ra ngoài mà không hoàn
					trả tiền vé.
					{"\n"}
					{"\n"}
					Không áp dụng HSSV cho suất chiếu sớm. HSSV suất trình thẻ
					HSSV để được hưởng ưu đãi. Rạp tạm ngừng áp dụng cho thành
					viên U22.
					{"\n"}
					{"\n"}
					Giá vé HSSV, Happy day, thẻ tích điểm không áp dụng cho ngày
					lễ, tết Các suất chiếu sẽ thực hiện khi có tối thiểu 2 khách
					trở lên.
					{"\n"}
					{"\n"}
					Quy định ngày được coi là ngày lễ: 1/1, 14/2, 8/3, 10/3 ÂL,
					30/4, 1/5, 2/9, 20/10, 24/12 và Tết Âm Lịch (BAO GỒM CẢ NGÀY
					NGHỈ BÙ).
				</ThemedText>
			</View>
		</ScrollView>
	);
};

export default TicketPriceScreen;
