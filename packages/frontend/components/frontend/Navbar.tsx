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
  apiKey: string;
};

export function Navbar({ setApiKey, apiKey }: Props) {
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
      <Flex gap="1rem" alignItems="center">
        <Box ml="1rem">
          <Image src="favicon.ico" borderRadius="100%" />
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
            Ethereal Visions
          </Link>
        </Heading>
      </Flex>
      <Flex flexDirection={"row"} alignItems="center" gap="1rem">
        <Button
          onClick={onOpen}
          color="blackAlpha.800"
          fontFamily="body"
          fontWeight="bold"
          bgColor="white"
          shadow="md"
          borderRadius="0.7rem"
          _hover={{
            bgColor: "white",
            color: "blackAlpha.800",
            fontFamily: "body",
            fontWeight: "bold",
            transform: "scale(1.01)",
          }}
          _active={{
            bgColor: "white",
            color: "blackAlpha.800",
          }}
        >
          Set API Key
        </Button>
        <ApiKeyModal
          isOpen={isOpen}
          onClose={onClose}
          setApiKey={setApiKey}
          apiKey={apiKey}
        />

        <Box mr={"2rem"}>
          <ConnectButton
            accountStatus="address"
            showBalance={false}
            chainStatus="icon"
          />
        </Box>
      </Flex>
    </Flex>
  );
}
