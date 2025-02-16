"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../../components/spinner";

const ProcessingPage = () => {
    const [data, setData] = useState<{ message: string } | null>(null);
    const [isProcessing, setIsProcessing] = useState(true);
    const router = useRouter();

    // Fetch API URL from env variables
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchProcessingData = async () => {
            try {
                const res = await fetch(`${API_URL}/processing`, {
                    method: "GET",
                    credentials: "include",
                    signal,
                });

                if (!res.ok) throw new Error("Failed to fetch processing data.");

                const result = await res.json();
                setData(result);

                if (result.message === "Processing complete") {
                    console.log("Processing complete, redirecting...");
                    router.push("/success");
                }
            } catch (error) {
                setData({ message: "Error fetching data: " + error });
                setIsProcessing(false);
            }
        };

        // Polling every 5 seconds
        const intervalId = setInterval(fetchProcessingData, 5000);

        // Cleanup on unmount
        return () => {
            clearInterval(intervalId);
            controller.abort();
        };
    }, [API_URL]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-semibold mb-4">We are processing your job!</h1>
            <Spinner />
            <p className="text-lg mt-4">
                Your job is being processed. You will be redirected to the download page once it&#39;s ready.
            </p>
        </div>
    );
};

export default ProcessingPage;
