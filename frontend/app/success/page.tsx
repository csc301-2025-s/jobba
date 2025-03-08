"use client";
import { useState } from "react";
import { Button } from "@heroui/react";

export default function SuccessPage() {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownload = async () => {
		setIsDownloading(true);

		try {
			const response = await fetch(`${apiUrl}/download-file`, {
				method: "GET",
				credentials: "include"
			});

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error("File not found");
				} else {
					throw new Error("Failed to download file");
				}
			}

			// Download file
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "job_applications.csv";
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			error;
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center text-center pt-64">
			<h1 className="text-3xl font-bold text-green-500">Success! Your file is ready.</h1>
			<p className="pt-8">Click the button below to download your file.</p>

			<Button className="mt-4" color="success" isDisabled={isDownloading} size="lg" onPress={handleDownload}>
				{isDownloading ? "Downloading..." : "Download Job Application Data"}
			</Button>
		</div>
	);
}
