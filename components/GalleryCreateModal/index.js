import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

export const GalleryCreateModal = ({
  isOpen = false,
  onOpen = () => {},
  onClose = () => {},
}) => {
  return (
    <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Lorem ipsum nad some more Lorem ipsum nad some more Lorem ipsum nad
          some more Lorem ipsum nad some more
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
