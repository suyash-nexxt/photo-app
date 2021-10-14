import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Flex } from '@chakra-ui/react';

const GalleryShowPage = () => {
  const router = useRouter();
  const galleryId = Number(router.query.id);
  console.log(galleryId);
  const { data: gallery } = useSWR(`api/galleries/${galleryId}/show`);

  if (!gallery) {
    return <div>empty</div>;
  }

  return (
    <>
      <h1>Gallery Page</h1>
      <Flex direction="row" wrap="wrap" justify="space-around">
        {gallery.photos.map((p: any) => {
          return (
            <Box key={p.id}>
              <Image src={p.url} width={200} height={200} alt="photo" />
            </Box>
          );
        })}
      </Flex>
    </>
  );
};

export default GalleryShowPage;
