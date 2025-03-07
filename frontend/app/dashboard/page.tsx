"use client";

import { useState, useEffect, Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { Button, DatePicker } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

export default function Dashboard() {
	const [showModal, setShowModal] = useState(true);
	const [startDate, setStartDate] = useState<CalendarDate | null>(null);
	const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
	const router = useRouter();
	const searchParams = useSearchParams();
	const userId = searchParams.get("user_id");
	const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

	// Mock data for the table
	const data = [
		{
			company_name: "Company A",
			application_status: "Pending",
			received_at: "2025-03-01",
			subject: "Software Engineer"
		},
		{
			company_name: "Company B",
			application_status: "Accepted",
			received_at: "2025-03-02",
			subject: "Product Manager"
		},
		{
			company_name: "Company C",
			application_status: "Rejected",
			received_at: "2025-03-03",
			subject: "Data Analyst"
		}
	];

	// Columns for the table
	const columns = [
		{ key: "company_name", label: "Company Name" },
		{ key: "application_status", label: "Application Status" },
		{ key: "received_at", label: "Received At" },
		{ key: "subject", label: "Subject" }
	];

	// Function to get data for each cell
	const getKeyValue = (item: any, columnKey: string) => {
		return item[columnKey] || "--"; // Safely handle missing data
	};

	useEffect(() => {
		if (!userId) {
			console.error("User ID not found in query parameters");
		}
	}, [userId]);

	const handleConfirm = async () => {
		console.log("Confirm button clicked");
		setStartDate(selectedDate);
		setShowModal(false);
		await fetch("/api/save-start-date", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ start_date: selectedDate?.toString() })
		});
		await fetch("/api/fetch-emails", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ user_id: userId }) // Use the user ID from query parameters
		});
		pollProcessingStatus();
	};

	const pollProcessingStatus = async () => {
		const interval = setInterval(async () => {
			const response = await fetch("/processing");
			const text = await response.text();
			console.log("API Response:", text); // Log the response text
			try {
				const data = JSON.parse(text);
				if (data.message === "Processing complete") {
					clearInterval(interval);
					router.replace(data.redirect_url);
				}
			} catch (error) {
				console.error("Error parsing JSON:", error);
			}
		}, 5000); // Poll every 5 seconds
	};

	return (
		<div className="flex flex-col items-center justify-center text-center px-4" data-testid="popup">
			{/* Modal */}
			<Transition appear as={Fragment} show={showModal}>
				<Dialog as="div" className="relative z-50" onClose={() => setShowModal(false)}>
					<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
					<div className="fixed inset-0 flex items-center justify-center">
						<div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
							<h2 className="text-xl font-semibold text-black">
								Please enter the start date of your current job search:
							</h2>
							<DatePicker
								className="mt-4 w-full p-2 border rounded-lg"
								data-testid="start-date-calendar"
								value={selectedDate}
								onChange={(date) => setSelectedDate(date as CalendarDate)}
							/>
							<button
								className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
								onClick={handleConfirm}
							>
								Confirm
							</button>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Dashboard */}
			{!showModal && (
				<>
					<div className="p-6 w-full max-w-7xl">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4 mb-6">
							<div className="flex-shrink-0">
								<h2 className="text-xl md:text-3xl font-bold text-foreground mb-4 md:mb-0">
									My Job Application Data
								</h2>
							</div>

							<div className="flex flex-col md:flex-row justify-end items-stretch md:items-center gap-3 w-full md:w-auto">
								<DatePicker
									className="mt-0 min-w-[200px] h-14 p-2 border rounded-lg"
									data-testid="edit-start-date-calendar"
									label="Start Date"
									value={selectedDate}
									onChange={(date) => setSelectedDate(date as CalendarDate)}
								/>

								{/* <Button
                  className="min-w-[200px] flex-1 h-14 truncate text-white text-base"
                  color="primary"
                  data-testid="sync-new-data"
                  radius="lg"
                >
                  Sync New Data
                </Button> */}

								<Button
									download
									as="a"
									className="min-w-[200px] flex-1 h-14 truncate text-white text-base"
									color="success"
									data-testid="download-csv"
									href={`${apiUrl}/download-file`}
									radius="lg"
								>
									Download CSV
								</Button>
							</div>
						</div>

						<div className="overflow-x-auto bg-white shadow-md rounded-lg mt-6">
							<Table aria-label="Example table with mock data" data-testid="jobs-table">
								<TableHeader>
									{/* Render table columns */}
									{columns.map((column) => (
										<TableColumn key={column.key}>{column.label}</TableColumn>
									))}
								</TableHeader>
								<TableBody>
									{data.length > 0 ? (
										data.map((item, index) => (
											<TableRow key={index}>
												{/* Render a TableCell for each column */}
												{columns.map((column) => (
													<TableCell key={column.key}>
														{getKeyValue(item, column.key)}
													</TableCell>
												))}
											</TableRow>
										))
									) : (
										<TableRow>
											{/* Empty row that spans all 4 columns */}
											<TableCell className="p-4 text-center" colSpan={4}>
												No data available
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					</div>
					{/* <h1 className="text-3xl font-bold text-blue-500">Dashboard</h1>
					<p className="pt-8">Your job search start date: {startDate ? startDate.toString() : "Not set"}</p> */}
				</>
			)}
		</div>
	);
}
