import {
  CustomDivider,
  ImageCard,
  Navbar,
  OneClickHeading,
  Prompt,
} from "@/components/frontend";
import { Data } from "@/utils/types";
import { Box, Heading, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, connector, isConnected } = useAccount();

  const [showPrompt, setShowPrompt] = useState<Boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [dataResponse, setDataResponse] = useState<Data | null>(null);
  const [isLoaded, setisLoaded] = useState<boolean>(false);

  const handleShowPrompt = () => {
    setShowPrompt(true);
  };

  const handlePrompt = (prompt: string) => {
    setPrompt(prompt);
  };

  const handleResponse = async (dataResponse: Data) => {
    const id = dataResponse?.id;
    const res = await (await fetch(`/api/check/${id}`)).json();
    if (res.status === "success") {
      setDataResponse(res);
      setisLoaded(false);
      return;
    }
    setDataResponse(res);
    setisLoaded(true);
  };

  console.log(dataResponse);

  const ImageCards = (): JSX.Element => {
    if (dataResponse?.status === "success") {
      return (
        <Box>
          {dataResponse?.items.map((item) => (
            <ImageCard imageUrl={item} />
          ))}
        </Box>
      );
    }
    return (
      <Skeleton
        height="100%"
        width="100%"
        borderRadius="lg"
        startColor="gray.100"
        endColor="gray.200"
      />
    );
  };

  return (
    <>
      <Navbar />
      <OneClickHeading />
      <CustomDivider />
      {isConnected && (
        <Prompt
          prompt={prompt}
          setResponse={(data: Data) => setDataResponse(data)}
        />
      )}
      <Box>
        <ImageCards />
      </Box>
    </>
  );
}
