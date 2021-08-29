import {
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';

export interface Props {
  children: React.ReactElement;
  onCloseClick: (event: any) => any;
}

export const ErrorAlert = ({ children, onCloseClick }: Props) => {
  return (
    <Alert status="error" mb={3}>
      <AlertIcon />
      <AlertTitle mr={2}>Oops!</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={onCloseClick}
      />
    </Alert>
  );
};
