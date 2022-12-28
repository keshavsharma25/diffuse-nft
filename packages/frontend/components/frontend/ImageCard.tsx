import { Image, LinkBox, LinkOverlay } from "@chakra-ui/react";
import React from "react";

type Props = { imageUrl: string };

export const ImageCard = (props: Props) => {
  return (
    <LinkBox>
      <LinkOverlay>
        <Image src={props.imageUrl} w="40rem" h="auto" />
      </LinkOverlay>
    </LinkBox>
  );
};
