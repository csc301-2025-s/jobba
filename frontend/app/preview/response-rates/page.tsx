import ResponseRateCard from "@/components/response_rate_card_preview";
import UniqueOpenRateChart from "@/components/response_rate_chart_preview";

export default function ResponseRates() {
	return (
		<main className="p-8">
			<ResponseRateCard />
			<div className="p-4" />
			<UniqueOpenRateChart />
		</main>
	);
}
