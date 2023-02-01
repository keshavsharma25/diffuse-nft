import { ResponseType, SDConfig } from "@/utils/types";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Settings } from "./Settings";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

type Props = {
  response: ResponseType | null;
  setResponse: React.Dispatch<React.SetStateAction<ResponseType | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  apiKey: string;
  settings: SDConfig;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
};

export const SettingsContext = React.createContext({});

export const Prompt = ({
  response,
  setResponse,
  setIsLoading,
  isLoading,
  apiKey,
  settings,
  dispatch,
  prompt,
  setPrompt,
}: Props) => {
  const { isOpen, onToggle } = useDisclosure();

  const promptRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("UseEffect: response is set to:", response);
  }, [response]);

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
        setIsLoading(false);
        setResponse({
          status: res.status,
          items: [],
          error: res.statusText,
        });
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
      <Flex
        flexDir={{
          base: "column",
          md: "row",
        }}
        justifyContent="center"
        alignItems={{
          base: "center",
          md: "flex-start",
        }}
        mx={{
          base: "3rem",
          md: "0rem",
        }}
        gap={{
          base: "1rem",
          md: "0rem",
        }}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          columnGap="0.5rem"
          flexDir="column"
          w={{
            base: "100%",
            md: "50%",
          }}
          position="relative"
        >
          <Flex
            border="1px solid gray"
            w="100%"
            {...(isOpen
              ? { borderTopLeftRadius: "1rem" }
              : { borderLeftRadius: "1rem" })}
            {...(isOpen
              ? {}
              : {
                  borderBottomRightRadius: {
                    base: "1rem",
                    md: "0rem",
                  },
                })}
            overflow="hidden"
            roundedTopRight={{
              base: "1rem",
              md: "0rem",
            }}
          >
            <Input
              placeholder="Enter a prompt"
              width="100%"
              onChange={handlePrompt}
              border="none"
              ref={promptRef}
              _focus={{
                outline: "none",
                border: "none",
                boxShadow: "none",
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onSubmit(e as React.FormEvent<HTMLButtonElement>);
                }
              }}
            />
            {promptRef?.current?.value && (
              <Button
                backgroundColor="white"
                _hover={{
                  backgroundColor: "white",
                }}
                onClick={() => {
                  if (promptRef?.current?.value) {
                    promptRef.current.value = "";
                    setPrompt("");
                  }
                }}
              >
                <RxCross2 color="rgba(0, 0, 0, 0.7)" />
              </Button>
            )}
            {promptRef?.current?.value && (
              <Center my="0.5rem">
                <Divider orientation="vertical" borderColor="black" />
              </Center>
            )}
            <Button
              onClick={onToggle}
              rounded="0rem"
              backgroundColor="white"
              _hover={{
                backgroundColor: "white",
              }}
            >
              {isOpen ? <BsCaretUp /> : <BsCaretDown />}
            </Button>
          </Flex>
          <Box
            width="100%"
            bgColor="white"
            borderX="1px solid gray"
            {...(isOpen
              ? {
                  borderBottom: "1px solid gray",
                  borderBottomRadius: "1rem",
                }
              : {})}
            position="absolute"
            top="42px"
            left="0"
            zIndex="10"
          >
            <Settings isOpen={isOpen} settings={settings} dispatch={dispatch} />
          </Box>
        </Flex>
        <Button
          bgColor="black"
          width={{
            base: "100%",
            md: "50%",
          }}
          maxW="6rem"
          py="1.313rem"
          color="white"
          onClick={onSubmit}
          borderLeftRadius="0rem"
          borderRightRadius="1rem"
          _hover={{ bgColor: "rgba(0, 0, 0, 0.8)" }}
          roundedLeft={{
            base: "1rem",
            md: "0rem",
          }}
          isLoading={isLoading}
        >
          Submit
        </Button>
      </Flex>

      <Box></Box>
      {/* <Box>
        {response?.status != null && response?.status != 200 ? (
          <Box>
            <h1>Error: {response?.error}</h1>
          </Box>
        ) : (
          ""
        )}
      </Box> */}
    </>
  );
};
