import { Prompt } from "@/components/frontend";
import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

type Props = {};

export default function create({}: Props) {
  return (
    <>
      <Box mt="1rem" mx="4rem">
        <Heading my="2rem">Create</Heading>
        <Prompt />
      </Box>
    </>
  );
}
