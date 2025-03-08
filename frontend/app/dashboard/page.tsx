"use client";

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { useRouter } from "next/navigation";

interface Application {
	id?: string;
	company_name: string;
	application_status: string;
	received_at: string;
	subject: string;
	from: string;
}

export default function Dashboard() {
	const router = useRouter();
	const [data, setData] = useState<Application[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${apiUrl}/get-emails`, {
					method: "GET",
					credentials: "include" // Include cookies for session management
				});

				if (!response.ok) {
					if (response.status === 404) {
						setError("No applications found");
					} else {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
				}

				const result = await response.json();

				if (result.length === 0) {
					setError("No applications found");
				} else {
					setData(result);
				}
			} catch (error) {
				error;
				setError("Failed to load applications");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [router, apiUrl]);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Job Applications Dashboard</h1>

			{loading ? (
				<p>Loading applications...</p>
			) : error ? (
				<div className="text-red-500">
					<p>{error}</p>
					<button className="mt-4 text-blue-500 hover:underline" onClick={() => window.location.reload()}>
						Try again
					</button>
				</div>
			) : (
				<div className="overflow-x-auto bg-white shadow-md rounded-lg">
					<Table aria-label="Applications Table">
						<TableHeader>
							<TableColumn>Company</TableColumn>
							<TableColumn>Status</TableColumn>
							<TableColumn>Received</TableColumn>
							<TableColumn>Subject</TableColumn>
							<TableColumn>Sender</TableColumn>
						</TableHeader>
						<TableBody>
							{data.map((item) => (
								<TableRow key={item.id || item.received_at}>
									<TableCell>{item.company_name || "--"}</TableCell>
									<TableCell>
										<span
											className={`px-2 py-1 rounded ${
												item.application_status.toLowerCase() === "rejected"
													? "bg-red-100 text-red-800"
													: "bg-green-100 text-green-800"
											}`}
										>
											{item.application_status || "--"}
										</span>
									</TableCell>
									<TableCell>{new Date(item.received_at).toLocaleDateString() || "--"}</TableCell>
									<TableCell className="max-w-[300px] truncate">{item.subject || "--"}</TableCell>
									<TableCell>{item.from || "--"}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</div>
	);
}
