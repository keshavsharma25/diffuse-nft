import {
  CustomDivider,
  ImageCard,
  Navbar,
  OneClickHeading,
  Prompt,
} from "@/components/frontend";
import { useSettings } from "@/hooks";
import { ResponseType } from "@/utils/types";
import {
  Box,
  Flex,
  Grid,
  SimpleGrid,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, connector, isConnected } = useAccount();
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>(
    process.env.NEXT_PUBLIC_STABILITY_API
      ? process.env.NEXT_PUBLIC_STABILITY_API
      : ""
  );
  const [prompt, setPrompt] = useState<string>("");
  const [settings, dispatch] = useSettings();

  useEffect(() => {
    console.log("UseEffect: response is set to:", response);
    console.log("UseEffect: apiKey is set to:", apiKey);
  }, [response, apiKey]);

  return (
    <>
      <Navbar setApiKey={setApiKey} apiKey={apiKey} />
      <OneClickHeading />
      <CustomDivider />
      {isConnected && (
        <Prompt
          response={response}
          setResponse={setResponse}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          apiKey={apiKey}
          settings={settings}
          dispatch={dispatch}
          prompt={prompt}
          setPrompt={setPrompt}
        />
      )}

      {!isLoading ? (
        <SimpleGrid
          columns={{
            base: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
          }}
          spacing="10"
          py="5rem"
          px="5rem"
        >
          {response?.items?.map((item, index) => (
            <ImageCard
              key={index}
              base64={item.base64}
              prompt={prompt}
              settings={settings}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Flex flexDir="row" py="10rem">
          <Skeleton height="1.5rem" />
          <Skeleton height="1.5rem" />
          <Skeleton height="1.5rem" />
        </Flex>
      )}
    </>
  );
}
