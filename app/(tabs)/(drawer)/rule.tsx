import { View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { Dimentions } from "@/constants/Dimentions";
import { Collapsible } from "@/components/Collapsible";

const RuleScreen = () => {
	return (
		<ScrollView
			style={{
				backgroundColor: Colors.backgroundSecondary,
				paddingTop: 20,
				paddingHorizontal: Dimentions.appPadding,
			}}
		>
			<View style={{ marginBottom: 16 }}>
				<View style={{ flexDirection: "row", gap: 14 }}>
					<View
						style={{ backgroundColor: Colors.tint, width: 4 }}
					/>
					<ThemedText
						type="title"
						style={{ fontSize: 26, lineHeight: 36, flex: 1 }}
					>
						利用規則
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

			{/* content  */}
			<View style={{ gap: 10 }}>
				<Collapsible title="1. Xây dựng văn hóa văn minh tại rạp chiếu phim">
					<ThemedText
						style={{
							backgroundColor: Colors.backgroundSecondary,
						}}
					>
						・Đến sớm trước giờ chiếu {`\n`}
						・Ngồi đúng vị trí in trên vé {`\n`}
						・Không sử dụng khi vào phim chính {`\n`}
						・Không gây khó chịu cho người xung quanh {`\n`}
						・Giữ yên lặng khi vào phim chính {`\n`}
						・Tuân thủ nội quy rạp {`\n`}
					</ThemedText>
				</Collapsible>
				<Collapsible title="2. Tại nơi gửi xe">
					<ThemedText
						style={{
							backgroundColor: Colors.backgroundSecondary,
						}}
					>
						・Đề nghị quý khách làm thủ tục đầy đủ với đội an ninh
						bảo vệ giữ xe. {`\n`}
						・Để xe theo đúng hướng dẫn của bảo vệ, giữ vé xe cẩn
						thận. {`\n`}
						・Khi ra về cần giữ trật tự, lấy xe lần lượt, ko chen
						lấn xô đẩy. {`\n`}
					</ThemedText>
				</Collapsible>
				<Collapsible title="3. Tại quầy vé và quầy dịch vụ.">
					<ThemedText
						style={{
							backgroundColor: Colors.backgroundSecondary,
						}}
					>
						・Xếp hàng mua theo thứ tự, không chen lấn xô đẩy. Nhân
						viên quầy vé có quyền từ chối bán vé cho ai không thực
						hiện nội quy.
						{`\n`}
						・Xem trước lịch và chọn trước phim khi vào quầy vé.
						{`\n`}
						・Thực hiện chỉ dẫn của nhân viên quầy. Giá vé của rạp
						áp dụng theo bảng giá đã công khai trên trang web của
						rạp. Khi có trẻ nhỏ, nhân viên rạp sẽ xác định xem trẻ
						có khả năng giữ yên lặng trong rạp không, nếu không nhân
						viên quầy vé sẽ là người quyết định cuối cùng rằng trẻ
						nhỏ đó có được mua vé vào rạp xem hay không.
						{`\n`}
						・Nhanh chóng hoàn thành việc chọn ghế và thanh toán
						trong không quá 1 phút.
						{`\n`}
					</ThemedText>
				</Collapsible>
			</View>
		</ScrollView>
	);
};

export default RuleScreen;
