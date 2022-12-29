import {
  CustomDivider,
  ImageCard,
  Navbar,
  OneClickHeading,
  Prompt,
} from "@/components/frontend";
import { Box, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ResponseType } from "@/utils/types";

export default function Home() {
  const { address, connector, isConnected } = useAccount();

  const [response, setResponse] = useState<ResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    console.log("UseEffect: response is set to:", response);
    console.log("UseEffect: apiKey is set to:", apiKey);
  }, [response, apiKey]);

  return (
    <>
      <Navbar setApiKey={setApiKey} />
      <OneClickHeading />
      <CustomDivider />
      {isConnected && (
        <Prompt
          response={response}
          setResponse={setResponse}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      <Box>
        {!isLoading ? (
          response?.items?.map((item, index) => (
            <ImageCard key={index} base64={item.base64} />
          ))
        ) : (
          <Skeleton height="100vh" />
        )}
      </Box>
    </>
  );
}
