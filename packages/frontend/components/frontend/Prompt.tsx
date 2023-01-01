import { ResponseType } from "@/utils/types";
import { Box, Button, Flex, Input, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSettings } from "@/hooks";
import { Settings } from "./Settings";

type Props = {
  response: ResponseType | null;
  setResponse: React.Dispatch<React.SetStateAction<ResponseType | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  apiKey: string;
};

export const SettingsContext = React.createContext({});

export const Prompt = ({
  response,
  setResponse,
  setIsLoading,
  isLoading,
  apiKey,
}: Props) => {
  const [prompt, setPrompt] = useState<string>("");
  const { isOpen, onToggle } = useDisclosure();
  const [settings, dispatch] = useSettings();

  useEffect(() => {
    console.log("UseEffect: settings is set to:", settings);
  }, [settings]);

  const handlePrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const body = {
      cfg_scale: settings.cfg_scale,
      clip_guidance_preset: settings.clip_guidance_preset,
      height: settings.height,
      width: settings.width,
      samples: settings.samples,
      steps: settings.steps,
      prompt: prompt,
      weight: settings.weight,
      apiKey: apiKey,
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
    <>
      <Flex alignItems="center" justifyContent="center" pt="1rem" gap="0.5rem">
        <Input
          placeholder="Enter a prompt"
          size="lg"
          w="45%"
          focusBorderColor={"grey"}
          onChange={handlePrompt}
        />
        {!isLoading ? (
          <Button
            size="lg"
            type="submit"
            bgColor="black"
            color="white"
            onClick={onSubmit}
          >
            Enter
          </Button>
        ) : (
          <Button size="lg" type="submit" isLoading disabled>
            Enter
          </Button>
        )}
        <Button
          size="lg"
          onClick={onToggle}
          border="1px"
          backgroundColor="white"
        >
          Options
        </Button>
      </Flex>

      <Box>
        <Settings isOpen={isOpen} settings={settings} dispatch={dispatch} />
      </Box>
    </>
  );
};
