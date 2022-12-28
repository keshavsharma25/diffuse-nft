import {
  CustomDivider,
  ImageCard,
  Navbar,
  OneClickHeading,
  Prompt,
} from "@/components/frontend";
import { Data } from "@/utils/types";
import { Box, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, connector, isConnected } = useAccount();

  const [response, setResponse] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("UseEffect: response is set to:", response);
  }, [response]);

  return (
    <>
      <Navbar />
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
        {response?.status === "succeeded"
          ? response.items.map((item, index) => (
              <ImageCard key={index} imageUrl={item} />
            ))
          : isLoading && <Skeleton width={"40rem"} height={"40rem"} />}
      </Box>
    </>
  );
}
