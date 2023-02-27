import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { CustomButton } from "./CustomButton";

type Props = {
  selectImage: string;
};

export const Display = ({ selectImage }: Props) => {
  return (
    <VStack
      mt="8"
      flex="1"
      justifyContent="center"
      alignItems="center"
      rowGap="0.5rem"
    >
      <Box>
        {
          // show empty box if no image is selected of 512x512 image
          selectImage === "" ? (
            <Flex
              border="2px solid #000"
              borderRadius="lg"
              overflow="hidden"
              width="512px"
              height="512px"
              justifyContent="center"
              alignItems="center"
            >
              <Text color="gray.500">Write a prompt to get started</Text>
            </Flex>
          ) : (
            <Box
              width="512px"
              height="512px"
              overflow="hidden"
              border="2px solid #000"
              borderRadius="lg"
            >
              <Image src={selectImage} draggable={false} />
            </Box>
          )
        }
      </Box>
      <Flex gap="1rem">
        <CustomButton text="Mint" />
        <CustomButton text="Variants" />
      </Flex>
    </VStack>
  );
};
