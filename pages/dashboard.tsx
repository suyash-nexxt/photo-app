import React from 'react';
import useSWR from 'swr';
import {
  Flex,
  Box,
  Heading,
  VStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Gallery } from '@prisma/client';
import { GalleryListItem } from 'components/GalleryListItem';
import { GalleryCreateModal } from 'components/GalleryCreateModal';
import { GalleryEditModal } from 'components/GalleryEditModal';

export default function DashboardPage() {
  const {
    data,
    isValidating: dashboardIsLoading,
    error: dashboardFetchError,
  } = useSWR(`/api/galleries`);
  const {
    isOpen: isGalleryCreateOpen,
    onClose: onGalleryCreateClose,
    onOpen: onGalleryCreateOpen,
  } = useDisclosure();

  const handleGalleryEdit = (e: any, id: any) => {
    e.preventDefault();
    console.log(`Editing gallery: ${id}`);
  };

  const handleGalleryDelete = (e: any, id: any) => {
    e.preventDefault();
    console.log(`Deleting gallery: ${id}`);
  };

  const handleGalleryCreateSubmit = (gallery: Gallery): void => {
    console.log('form submitted', gallery);
    onGalleryCreateClose();
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
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Heading size="xl" mb={3}>
          dashboard
        </Heading>
        <Button mr={4} onClick={onGalleryCreateOpen}>
          + Gallery
        </Button>
      </Flex>

      <VStack spacing={5}>
        {data?.map((item: any) => (
          <Flex
            width="100%"
            justifyContent="space-between"
            direction="row"
            radius={10}
            boxShadow="base"
            p={3}
            key={item.id}
          >
            <GalleryListItem
              name={item.name}
              onDeleteClick={(e) => handleGalleryDelete(e, item.id)}
              onEditClick={(e) => handleGalleryEdit(e, item.id)}
              href={''}
            />
          </Flex>
        ))}
      </VStack>
      <GalleryCreateModal
        isOpen={isGalleryCreateOpen}
        onClose={onGalleryCreateClose}
        onSubmit={handleGalleryCreateSubmit}
      />
    </Box>
  );
}
