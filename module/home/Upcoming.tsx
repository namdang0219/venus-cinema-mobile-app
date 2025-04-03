import React from "react";
import HorizontalListLayout from "@/components/layout/HorizontalListLayout";
import useSWR from "swr";
import { fetcher } from "@/utils/func/fetcher";
import NoData from "../NoData";
import { useRouter } from "expo-router";

const Upcoming = () => {
	const { push } = useRouter();
	const { data } = useSWR(
		`${process.env.EXPO_PUBLIC_API_URL}/movies?populate=poster&filters[movie_status]=ComingSoon&sort=updatedAt:desc&pagination[start]=0&pagination[limit]=5`,
		fetcher
	);

	if (data && data.data.length === 0) return <NoData />;

	const dataList = data?.data;

	return (
		<HorizontalListLayout
			title="公開予定"
			rightButtonAction={() => push(`/movies?type=ComingSoon`)}
			listItems={dataList}
		/>
	);
};

export default Upcoming;
