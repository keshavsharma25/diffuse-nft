import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  Flex,
  Link,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect } from "react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
};

export const ApiKeyModal = ({ onClose, isOpen, setApiKey }: Props) => {
  const [key, setKey] = React.useState<string>("");

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  useEffect(() => {
    console.log(key);
  }, [key]);

  const onClick = () => {
    setApiKey(key);
  };

  return (
    <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Set your API Key</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          To use the create stable diffusion images feature, you'll need to add
          your own API key. Sign up for an account with stability.ai{" "}
          <Link
            as={NextLink}
            href="https://beta.dreamstudio.ai/"
            isExternal
            color={"blue.500"}
          >
            DreamStudio
          </Link>{" "}
          to get an API key, and then follow the instructions to add it to your
          project. Thanks for understanding and for taking the time to set up
          your API key.
          <br />
          <br />
          API Key:{" "}
          <Input
            placeholder="Enter your API key"
            size="lg"
            w="45%"
            focusBorderColor={"grey"}
            onChange={handleKeyChange}
          />
        </ModalBody>
        <ModalFooter>
          <Flex gap={"0.5rem"}>
            <Button
              onClick={onClick}
              color="white"
              backgroundColor="blue.500"
              _hover={{
                textDecoration: "none",
              }}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Close</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
