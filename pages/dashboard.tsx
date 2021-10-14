import { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
  Flex,
  Box,
  Heading,
  VStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import { ErrorAlert } from 'components/ErrorAlert';
import { GalleryListItem } from 'components/GalleryListItem';
import { GalleryCreateModal } from 'components/GalleryCreateModal';
import { GalleryEditModal } from 'components/GalleryEditModal';
import { GalleryDeleteDialog } from 'components/GalleryDeleteDialog';
import { create, update, destroy } from '../lib/client/api/Galleries';

import { Prisma, Gallery } from '@prisma/client';

export default function DashboardPage() {
  const {
    data,
    isValidating: dashboardIsLoading,
    error: dashboardFetchError,
    mutate: mutateGalleries,
  } = useSWR(`/api/galleries`);

  const {
    isOpen: isGalleryCreateOpen,
    onClose: onGalleryCreateClose,
    onOpen: onGalleryCreateOpen,
  } = useDisclosure();

  const {
    isOpen: isGalleryEditOpen,
    onClose: onGalleryEditClose,
    onOpen: onGalleryEditOpen,
  } = useDisclosure();

  const {
    isOpen: isGalleryDeleteOpen,
    onClose: onGalleryDeleteClose,
    onOpen: onGalleryDeleteOpen,
  } = useDisclosure();

  const [currentGalleryForEditing, setCurrentGalleryForEditing] =
    useState<Gallery | null>(null);

  const [currentGalleryForDeletion, setCurrentGalleryForDeletion] =
    useState<Number | null>(null);

  const [error, setError] = useState('');

  useEffect(() => {
    onGalleryEditOpen();
    // eslint-disable-next-line
  }, [currentGalleryForEditing]);

  useEffect(() => {
    onGalleryDeleteOpen();
    // eslint-disable-next-line
  }, [currentGalleryForDeletion]);

  const handleGalleryCreateSubmit = async (
    gallery: Prisma.GalleryCreateInput
  ): Promise<void> => {
    try {
      await create(gallery);
      mutateGalleries();
    } catch (error) {
      setError('An error occured while creating the gallery');
    } finally {
      onGalleryCreateClose();
    }
  };

  const handleGalleryEdit = (e: InputEvent, gallery: Gallery) => {
    e.preventDefault();
    setCurrentGalleryForEditing(gallery);
  };

  const handleGalleryEditClose = () => {
    setCurrentGalleryForEditing(null);
  };

  const handleGalleryEditSubmit = async (id: number, gallery: Gallery) => {
    try {
      await update(id, gallery);
      mutateGalleries();
    } catch (error) {
      setError('An error occured while creating the gallery.');
    } finally {
      onGalleryEditClose();
    }
  };

  const handleGalleryDelete = (e: InputEvent, id: number) => {
    e.preventDefault();
    setCurrentGalleryForDeletion(id);
    onGalleryDeleteOpen();
  };

  const handleGalleryDeleteSubmit = async (e: InputEvent, id: number) => {
    e.preventDefault();

    try {
      await destroy(id);
      mutateGalleries();
    } catch (error) {
      setError('An error occured while deleting the gallery');
    } finally {
      onGalleryDeleteClose();
    }
  };

  const handleErrorAlertClose = (event: InputEvent) => {
    event.preventDefault();
    setError('');
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

      {error && (
        <ErrorAlert onCloseClick={handleErrorAlertClose}>{error}</ErrorAlert>
      )}

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
              onEditClick={(e) => handleGalleryEdit(e, item)}
              href={`/galleries/${item.id}`}
            />
          </Flex>
        ))}
      </VStack>

      <GalleryCreateModal
        isOpen={isGalleryCreateOpen}
        onClose={onGalleryCreateClose}
        onSubmit={handleGalleryCreateSubmit}
      />

      {currentGalleryForEditing && (
        <GalleryEditModal
          isOpen={isGalleryEditOpen}
          onClose={handleGalleryEditClose}
          onSubmit={handleGalleryEditSubmit}
          galleryId={currentGalleryForEditing?.id}
          defaultValues={currentGalleryForEditing}
        />
      )}

      {currentGalleryForDeletion && (
        <GalleryDeleteDialog
          isOpen={isGalleryDeleteOpen}
          onCloseClick={onGalleryDeleteClose}
          onConfirmClick={handleGalleryDeleteSubmit}
          galleryId={currentGalleryForDeletion}
        />
      )}
    </Box>
  );
}
