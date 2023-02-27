import { Button } from "@chakra-ui/react";

type Props = {
  text: string;
};

export const CustomButton = ({ text }: Props) => {
  return (
    <Button
      bgColor="blue.200"
      _hover={{
        bgColor: "blue.300",
      }}
    >
      {text}
    </Button>
  );
};
