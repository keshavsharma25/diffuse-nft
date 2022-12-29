import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";
import { ApiKeyModal } from "./ApiKeyModal";

type Props = {
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
};

export function Navbar({ setApiKey }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Flex flexDirection={"row"} alignItems="center">
        <Button onClick={onOpen}>Set API Key</Button>
        <ApiKeyModal isOpen={isOpen} onClose={onClose} setApiKey={setApiKey} />

        <Box pr={"2rem"}>
          <ConnectButton
            showBalance={false}
            chainStatus="icon"
            accountStatus="address"
          />
        </Box>
      </Flex>
    </Flex>
  );
}
