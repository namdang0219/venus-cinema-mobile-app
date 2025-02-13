import { Dimentions } from "@/constants/Dimentions";
import { useWindowDimensions } from "react-native";

export function useItemWidth(
	gap: number,
	numOfItem: number,
	containerPaddingH?: number
): number {
	const { width } = useWindowDimensions();
	const GAP = gap;
	const ITEM_PER_ROW = numOfItem;

	if (containerPaddingH || containerPaddingH === 0) {
		const ITEM_WIDTH =
			(width - containerPaddingH * 2 - GAP * (ITEM_PER_ROW - 1)) /
			ITEM_PER_ROW;
		return ITEM_WIDTH;
	} else {
		const ITEM_WIDTH =
			(width - Dimentions.appPadding * 2 - GAP * (ITEM_PER_ROW - 1)) /
			ITEM_PER_ROW;
		return ITEM_WIDTH;
	}
}
