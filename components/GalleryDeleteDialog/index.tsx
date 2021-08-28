import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';

export interface Props {
  isOpen: boolean;
  onCloseClick: () => unknown;
  onConfirmClick: (e: any, id: any) => unknown;
  galleryId: number;
}

export const GalleryDeleteDialog = ({
  isOpen,
  onCloseClick,
  onConfirmClick,
  galleryId,
}: Props) => {
  const cancelRef = useRef();

  const composedOnConfirmClick = (e: any) => {
    onConfirmClick(e, galleryId);
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef.current}
      onClose={onCloseClick}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete this gallery?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? This can&apos;t be undone?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef.current} onClick={onCloseClick}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={composedOnConfirmClick} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
