import { SDConfig } from "@/utils/types";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  base64: string;
  settings: SDConfig;
  prompt: string;
};

export const ImageCard = ({ base64, prompt, settings }: Props) => {
  const url = `data:image/png;base64,${base64}`;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);

  const handleOnMouseOver = () => {
    onOpen();
    setIsVisible(true);
  };

  const handleOnMouseLeave = () => {
    onClose();
    setIsVisible(false);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      shadow="md"
      onClick={onOpenModal}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
      position="relative"
      cursor="pointer"
      _after={{
        content: '""',
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: isVisible ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0)",
      }}
      _hover={{
        transform: "scale(1.05)",
        transition: "transform 0.2s",
      }}
    >
      <Image src={url} alt="prompt image" />

      <Flex>
        <Modal
          isOpen={isOpenModal}
          size={{
            base: "full",
            md: "xl",
            lg: "4xl",
            xl: "6xl",
          }}
          onClose={onCloseModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader justifyContent="center">Mint your NFT</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex
                gap="1rem"
                flexDir={{
                  base: "column",
                  md: "column",
                  lg: "row",
                }}
                justifyContent="center"
                alignItems={{
                  base: "center",
                  md: "center",
                  lg: "flex-start",
                }}
              >
                <Image
                  src={url}
                  alt="prompt image"
                  maxW={{
                    base: "auto",
                    md: "clamp(25rem, 50vw, 35rem)",
                  }}
                  height={{
                    base: "25rem",
                    md: "30rem",
                  }}
                  objectFit="contain"
                  bg="black"
                />

                <Box>
                  <ModalHeader fontSize="2rem" fontWeight="bold">
                    Ethereal Visions #1
                  </ModalHeader>
                  <br />
                  <ModalHeader fontSize="1.2rem" fontWeight="normal">
                    <b>Prompt</b>: {prompt}
                  </ModalHeader>
                  <ModalHeader fontSize="1.2rem" fontWeight="normal">
                    <b>Settings</b>:
                    <Box>
                      <Text>
                        Width-Height: {settings.width}x{settings.height}
                      </Text>
                      <Text>
                        Clip Guidance Preset: {settings.clip_guidance_preset}
                      </Text>
                      <Text>Sampler: {settings.sampler}</Text>
                      <Text>Steps: {settings.steps}</Text>
                      <Text>Seed: {settings.seed}</Text>
                      <Text>cfg scale: {settings.cfg_scale}</Text>
                      <Text>Weight: {settings.weight}</Text>
                    </Box>
                  </ModalHeader>
                </Box>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Flex columnGap="0.5rem">
                <Button
                  color="white"
                  bgColor="black"
                  _hover={{
                    bgColor: "rgba(0, 0, 0, 0.9)",
                  }}
                >
                  Mint
                </Button>
                <Button mr={3} onClick={onCloseModal}>
                  Close
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};
