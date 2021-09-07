import { useEffect } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Gallery } from '.prisma/client';

export interface Props {
  isOpen: boolean;
  onClose: () => any;
  onSubmit: (galleryId: number, gallery: Gallery) => void;
  defaultValues: any;
  galleryId: number;
}

export const GalleryEditModal = ({
  isOpen = false,
  onClose = () => {},
  onSubmit,
  defaultValues,
  galleryId,
}: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const composedOnSubmit = (gallery: Gallery) => {
    onSubmit(galleryId, gallery);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(composedOnSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" {...register('name', { required: true })} />
              <FormErrorMessage mb={2}>This field is required</FormErrorMessage>
            </FormControl>
            <FormControl id="description" isInvalid={!!errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea {...register('description', { required: true })} />
              <FormErrorMessage mb={2}>This field is required</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
