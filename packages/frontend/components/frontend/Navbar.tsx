import { Box, Flex, Heading, Image, Link } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";

type Props = {};

export function Navbar({}: Props) {
  return (
    <Flex
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      pt={"1rem"}
      pb={"1rem"}
      shadow={"md"}
    >
      <Flex pl={"2rem"} alignItems={"center"}>
        <Box border={"0.1rem"} borderColor={"black"}>
          <Image src="favicon.ico" pr={"0.5rem"} borderRadius="1.5rem" />
        </Box>
        <Heading
          size={"lg"}
          color={"black"}
          fontFamily={"sans-serif"}
          fontWeight={"extrabold"}
        >
          <Link
            as={NextLink}
            href="/"
            _hover={{
              textDecoration: "none",
            }}
          >
            Diffuse NFT
          </Link>
        </Heading>
      </Flex>
      <Box pr={"2rem"}>
        <ConnectButton />
      </Box>
    </Flex>
  );
}
