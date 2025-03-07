"use client";

import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@heroui/table';

interface Application {
  id?: string;
  company_name: string;
  application_status: string;
  received_at: string;
  subject: string;
  from: string;
}

export default function Dashboard() {
  const [data, setData] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false); // Track if the response is empty

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/query-emails');
        const result = await response.json();
        if (!result.emails || result.emails.length === 0) {
          setIsEmpty(true);
        } else {
          setData(result.emails);
          setIsEmpty(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsEmpty(true); // Assume empty in case of an error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {loading ? (
        <p>Loading applications...</p>
      ) : isEmpty ? (
        <p className="text-gray-500 text-lg">No data available</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <Table aria-label="Applications Table">
            <TableHeader>
              <TableColumn>Company Name</TableColumn>
              <TableColumn>Application Status</TableColumn>
              <TableColumn>Received At</TableColumn>
              <TableColumn>Subject</TableColumn>
              <TableColumn>From</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id || item.received_at}>
                  <TableCell>{item.company_name || '--'}</TableCell>
                  <TableCell>{item.application_status || '--'}</TableCell>
                  <TableCell>{item.received_at || '--'}</TableCell>
                  <TableCell>{item.subject || '--'}</TableCell>
                  <TableCell>{item.from || '--'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
