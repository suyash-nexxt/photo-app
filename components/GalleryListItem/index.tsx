import React from 'react';
import { Flex, Heading, HStack } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import { FaEdit, FaWindowClose } from 'react-icons/fa';

export const GalleryListItem = ({ name, key }: any) => {
  return (
    <Flex
      key={key}
      width="100%"
      justifyContent="space-between"
      direction="row"
      radius={10}
      boxShadow="base"
      p={3}
    >
      <Heading size="md">{name}</Heading>

      <HStack spacing="5px">
        <IconButton
          aria-label="Edit this gallery&#39;s name and description"
          icon={<FaEdit />}
          onClick={() => {}}
        />

        <IconButton
          aria-label="Delete this gallery"
          icon={<FaWindowClose />}
          onCLick={() => {}}
        />
      </HStack>
    </Flex>
  );
};
