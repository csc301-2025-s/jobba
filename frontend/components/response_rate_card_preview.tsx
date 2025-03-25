"use client";
import { useState, useEffect } from "react";
import { mockData } from "../utils/mockData";

export default function ResponseRateCardPreview() {
	const [value, setValue] = useState<number | null>(null);

	useEffect(() => {
		// Simulating the calculation of response rate from mock data
		const totalApplications = mockData.length;
		const respondedApplications = mockData.filter(
			(app) => app.application_status !== "No Response"
		).length;

		const responseRate = totalApplications > 0 ? Math.round((respondedApplications / totalApplications) * 100) : 0;
		setValue(responseRate);
	}, []);

	return (
		<div className="mt-4 bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4 w-64">
			<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Response Rate</h3>
			<p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{value}%</p>
		</div>
	);
}
