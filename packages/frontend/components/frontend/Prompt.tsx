import { Button, Flex, Input } from "@chakra-ui/react";

type Props = {};

export const Prompt = (props: Props) => {
  return (
    <Flex alignItems={"center"} justifyContent="center" pt={"2rem"}>
      <Input
        placeholder="Enter a prompt"
        size="lg"
        w="45%"
        focusBorderColor={"grey"}
      />
      <Button size={"lg"}>Enter</Button>
    </Flex>
  );
};
