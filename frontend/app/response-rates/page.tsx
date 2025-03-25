import ResponseRateCard from "../../components/response_rate_card";
import UniqueOpenRateChart from "@/components/response_rate_chart";

export default function ResponseRates() {
	return (
		<main className="p-8">
			<ResponseRateCard />
			<UniqueOpenRateChart />
		</main>
	);
}
