import { ResponseType } from "@/utils/types";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";

interface SDConfig {
  cfg_scale: number;
  clip_guidance_preset:
    | "NONE"
    | "FAST_BLUE"
    | "FAST_GREEN"
    | "NONE"
    | "SIMPLE"
    | "SLOW"
    | "SLOWER"
    | "SLOWEST";
  height: number;
  width: number;
  samples: number;
  seed: number;
  steps: number;
  prompt: string;
  apiKey: string;
}

type Props = {
  response: ResponseType | null;
  setResponse: React.Dispatch<React.SetStateAction<ResponseType | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

export const Prompt = ({
  response,
  setResponse,
  setIsLoading,
  isLoading,
}: Props) => {
  const [prompt, setPrompt] = useState<string>("");

  const handlePrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const body = {
      cfg_scale: 7,
      clip_guidance_preset: "FAST_BLUE",
      height: 512,
      width: 512,
      samples: 2,
      steps: 50,
      prompt: prompt,
      weight: 1,
      apiKey: "sk-QRQpA5O40FeUG33OfENFxJqjyORAUSZXmrBpKmujbEF0faIs",
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      const res = await fetch("/api/retrieve_sd_images", options);

      if (!res.ok) {
        console.error(`Error: ${res.status} - ${res.statusText}`);
        return;
      }

      const status = res.status;
      const data = await res.json();

      console.log("Data:", data);

      const finalResponse: ResponseType = {
        status: status,
        items: data.images,
      };

      setResponse(finalResponse);
      console.log("Setting response to:", finalResponse);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        const finalResponse: ResponseType = {
          status: 500,
          items: [],
          error: error.message,
        };
        setResponse(finalResponse);
      }
    }
  };

  return (
    <Flex alignItems={"center"} justifyContent="center" pt={"2rem"}>
      <Input
        placeholder="Enter a prompt"
        size="lg"
        w="45%"
        focusBorderColor={"grey"}
        onChange={handlePrompt}
      />
      {!isLoading ? (
        <Button size={"lg"} type="submit" onClick={onSubmit}>
          Enter
        </Button>
      ) : (
        <Button size={"lg"} type="submit" isLoading disabled>
          Enter
        </Button>
      )}
    </Flex>
  );
};
