import React from 'react';
import useSWR from 'swr';

export default function DashboardPage() {
  const {
    data,
    isValidating: dashboardIsLoading,
    error: dashboardFetchError,
  } = useSWR(`/api/dashboard`);

  if (dashboardIsLoading) {
    return <h1>Loading dashboard...</h1>;
  }

  if (dashboardFetchError) {
    return <h1>Error loading the dashboard</h1>;
  }

  return (
    <>
      <h1>dashboard</h1>
      <ul>
        {data?.galleries?.map((item: any) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
          </li>
        ))}
      </ul>
    </>
  );
}
