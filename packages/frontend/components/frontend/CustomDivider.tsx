import { Flex } from "@chakra-ui/react";
import React from "react";

type Props = {};

export const CustomDivider = (props: Props) => {
  return (
    <Flex
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 17%, rgba(0,0,0,1) 83%, rgba(255,255,255,1) 100%)",
      }}
      opacity={0.5}
      h="0.05rem"
      mx="auto"
      w="50%"
      mt="2rem"
      mb="2rem"
    ></Flex>
  );
};
