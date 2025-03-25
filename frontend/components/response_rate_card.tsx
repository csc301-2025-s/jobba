"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResponseRateCard() {
	const [lastUpdated, setLastUpdated] = useState<string>("");

	const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/";
	const [value, setValue] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${apiUrl}/user-response-rate`, {
					method: "GET",
					credentials: "include" // Include cookies for session management
				});

				if (!response.ok) {
					if (response.status === 404) {
						// No data found
					} else {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
				}
				const result = await response.json();
				console.log(result.value);

				if (result.length === 0) {
					// No data found
				} else {
					setValue(result.value);
				}
			} catch {
				// Failed to load data
			} finally {
				// Set loading to false
			}
		};

		fetchData();
	}, [router]);

	return (
		<div className="mt-4 bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4 w-64">
			<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Response Rate</h3>
			<p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{value}%</p>
			{/* <p className="text-xs text-gray-500 dark:text-gray-400">Last updated: {lastUpdated}</p> */}
		</div>
	);
}
