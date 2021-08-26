import React from 'react';
import useSWR from 'swr';
import { Box, Heading, VStack } from '@chakra-ui/layout';
import { GalleryListItem } from 'components/GalleryListItem';

export default function DashboardPage() {
  const {
    data,
    isValidating: dashboardIsLoading,
    error: dashboardFetchError,
  } = useSWR(`/api/galleries`);

  const handleGalleryEdit = (e: any, id: any) => {
    e.preventDefault();
    console.log(`Editing gallery: ${id}`);
  };

  const handleGalleryDelete = (e: any, id: any) => {
    e.preventDefault();
    console.log(`Editing gallery: ${id}`);
  };

  if (dashboardIsLoading) {
    return <h1>Loading dashboard...</h1>;
  }

  if (dashboardFetchError) {
    return <h1>Error loading the dashboard</h1>;
  }

  return (
    <Box
      m="0 auto"
      p={5}
      maxWidth={{
        sm: '100%',
        md: '100%',
        lg: '40em',
        xl: '50em',
        '2xl': '74em',
      }}
    >
      <Heading size="xl" mb={3}>
        dashboard
      </Heading>
      <VStack spacing={5}>
        {data?.map((item: any) => (
          <GalleryListItem
            key={item.id}
            name={item.name}
            onDeleteClick={(e) => handleGalleryDelete(e, item.id)}
            onEditClick={(e) => handleGalleryEdit(e, item.id)}
            href={''}
          />
        ))}
      </VStack>
    </Box>
  );
}
