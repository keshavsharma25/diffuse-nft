import { Box, Flex } from "@chakra-ui/react";
import React from "react";

type Props = {};

export function OneClickHeading({}: Props) {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      pt={"4rem"}
      fontSize="4xl"
      pb={"2rem"}
    >
      <Box>Use Stable Diffusion</Box>
      <Box>&</Box>
      <Box>Create NFTs in One Click</Box>
    </Flex>
  );
}
