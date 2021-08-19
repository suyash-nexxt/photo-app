import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Heading, Flex } from '@chakra-ui/layout';

export default function Home() {
  return (
    <Flex
      direction="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1" size="lg">
        Photo App
      </Heading>
      <Heading as="h2" size="md">
        Create and share photo galleries
      </Heading>
    </Flex>
  );
}
