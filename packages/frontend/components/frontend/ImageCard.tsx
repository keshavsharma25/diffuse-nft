import { Box, Image } from "@chakra-ui/react";

type Props = { base64: string };

export const ImageCard = ({ base64 }: Props) => {
  const url = `data:image/png;base64,${base64}`;

  return (
    <Box>
      <Image src={url} alt="prompt image" />
    </Box>
  );
};
