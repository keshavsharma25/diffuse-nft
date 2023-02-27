import { Prompt, Display } from "@/components/frontend";
import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

type Props = {};

export default function create({}: Props) {
  const [selectImage, setSelectImage] = React.useState<string>("");

  return (
    <>
      <Box mt="1rem" mx="4rem">
        <Heading my="2rem">Create</Heading>
        <Flex justifyContent="space-between">
          <Prompt selectImage={selectImage} setSelectImage={setSelectImage} />
          <Display selectImage={selectImage} />
        </Flex>
      </Box>
    </>
  );
}
