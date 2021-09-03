import React from 'react';
import { useRouter } from 'next/router';

const GalleryDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div>Gallery detail here for id # {id}</div>
    </>
  );
};

export default GalleryDetail;
