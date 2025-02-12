import { View, Text, Modal } from "react-native";
import React, { Dispatch, FC, SetStateAction } from "react";
import ImageViewer from "react-native-image-zoom-viewer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomTouchableOpacity from "./CustomTouchableOpacity";
import { AntDesign } from "@expo/vector-icons";

type CustomImageViewerProps = {
	images: Array<{ url: string }>;
	setIsVisible: Dispatch<SetStateAction<boolean>>;
	visible: boolean;
};

const CustomImageViewer: FC<CustomImageViewerProps> = ({
	images = [],
	setIsVisible = () => {},
	visible = false,
}) => {
	const { top } = useSafeAreaInsets();

	return (
		<Modal visible={visible} transparent={true} animationType="fade">
			<ImageViewer
				imageUrls={images}
				enableSwipeDown
				onCancel={() => setIsVisible(false)}
				renderIndicator={() => <></>}
				renderHeader={() => (
					<View
						style={{
							position: "absolute",
							top: top + 10,
							left: 20,
							zIndex: 100,
						}}
					>
						<CustomTouchableOpacity
							onPress={() => setIsVisible(false)}
						>
							<AntDesign
								name="close"
								color="white"
								size={25}
								style={{ opacity: 0.8 }}
							/>
						</CustomTouchableOpacity>
					</View>
				)}
			/>
		</Modal>
	);
};

export default CustomImageViewer;
