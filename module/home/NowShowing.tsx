import React, { useEffect } from "react";
import HorizontalListLayout from "@/components/layout/HorizontalListLayout";
import useSWR from "swr";
import { fetcher } from "@/utils/func/fetcher";
import NoData from "../NoData";

const NowShowing = () => {
	const { data } = useSWR(
		`${process.env.EXPO_PUBLIC_API_URL}/movies?populate=poster&filters[movie_status]=NowShowing`,
		fetcher
	);

	if (data && data.data.length === 0) return <NoData />;

	const dataList = data?.data;

	return (
		<HorizontalListLayout
			title="上映中"
			rightButtonAction={() => {}}
			listItems={dataList}
		/>
	);
};

export default NowShowing;
