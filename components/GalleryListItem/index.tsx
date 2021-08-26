import React from 'react';
import { Flex, Heading, HStack } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import Link from 'next/link';

export interface Props {
  name: string;
  href: string;
  onDeleteClick: (e: any) => any;
  onEditClick: (e: any) => any;
  key: any;
}

export const GalleryListItem = ({
  name,
  key,
  href,
  onDeleteClick,
  onEditClick,
}: Props) => {
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
      <Heading size="md">
        <Link href={href}>{name}</Link>
      </Heading>

      <HStack spacing="5px">
        <IconButton
          aria-label="Edit this gallery&#39;s name and description"
          icon={<FaEdit />}
          onClick={onEditClick}
        />

        <IconButton
          aria-label="Delete this gallery"
          icon={<FaWindowClose />}
          onCLick={onDeleteClick}
        />
      </HStack>
    </Flex>
  );
};
