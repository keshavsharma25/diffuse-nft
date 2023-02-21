import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";

type Props = {};

export function Navbar({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      pt="1rem"
      pb="1rem"
      shadow="md"
    >
      <Flex gap="0.1rem" justifyContent="center" alignItems="center">
        <Box>
          <Image src="favicon.ico" width="4rem" />
        </Box>

        <Flex gap="2.5rem">
          <Link
            as={NextLink}
            fontSize="xl"
            fontWeight="bold"
            href="/"
            _hover={{
              textDecoration: "none",
            }}
          >
            Ethereal Visions
          </Link>
          <Link
            as={NextLink}
            fontSize="xl"
            href="/create"
            _hover={{
              textDecoration: "none",
            }}
          >
            Create
          </Link>

          <Link
            as={NextLink}
            fontSize="xl"
            href="/history"
            _hover={{
              textDecoration: "none",
            }}
          >
            History
          </Link>

          <Link
            as={NextLink}
            fontSize="xl"
            href="/yourNFTs"
            _hover={{
              textDecoration: "none",
            }}
          >
            Your NFTs
          </Link>

          <Link
            as={NextLink}
            fontSize="xl"
            href="/collection"
            _hover={{
              textDecoration: "none",
            }}
          >
            NFT Collection
          </Link>
        </Flex>
      </Flex>

      <Box mr="2rem">
        <ConnectButton
          accountStatus="address"
          showBalance={false}
          chainStatus="icon"
        />
      </Box>
    </Flex>
  );
}
