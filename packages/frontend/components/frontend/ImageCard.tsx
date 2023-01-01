import { Box, Flex, Image } from "@chakra-ui/react";

type Props = { base64: string };

export const ImageCard = ({ base64 }: Props) => {
  const url = `data:image/png;base64,${base64}`;

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      shadow="md"
    >
      <Image src={url} alt="prompt image" />
    </Box>
  );
};
