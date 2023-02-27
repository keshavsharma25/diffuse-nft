import {
  Box,
  Button,
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TfiSearch } from "react-icons/tfi";
import { ImageCards } from "./ImageCards";

type Props = {
  selectImage: string;
  setSelectImage: React.Dispatch<React.SetStateAction<string>>;
};

export function Prompt({ selectImage, setSelectImage }: Props) {
  const [prompt, setPrompt] = useState<string>("");
  const [numImages, setNumImages] = useState<number>(1);
  const [images, setImages] = useState<string[]>([]);

  const handleOnChangePrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleOnChangeNumImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumImages(parseInt(e.target.value));
  };

  const handleOnClickPrompt = async (finalPrompt: string) => {
    // if (prompt === "") {
    //   return;
    // }
    // const genImages = await axios({
    //   method: "post",
    //   url: "/api/gen-images",
    //   data: {
    //     prompt: finalPrompt,
    //     n: numImages,
    //     size: "256x256",
    //     response_format: "url",
    //   },
    // });
    // const imageUrls = genImages.data.data.map((image: any) => image.url);
    // setImages(imageUrls);

    setImages([
      "https://images.unsplash.com/photo-1504600770771-fb03a6961d33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=512&q=80",
      "https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=512&q=80",
    ]);
  };

  return (
    <Box flex="1">
      <Flex justifyContent="space-between" gap="1rem">
        <Flex border="1px" alignItems="center" borderRadius="full" flex="1">
          <Input
            onChange={handleOnChangePrompt}
            border="0px"
            _focus={{ boxShadow: "none" }}
          />
          <Button
            backgroundColor="white"
            overflow="hidden"
            borderRightRadius="full"
            _hover={{ backgroundColor: "white" }}
            onClick={() => {
              setImages([]);
              handleOnClickPrompt(prompt);
            }}
          >
            <TfiSearch />
          </Button>
        </Flex>
        <NumberInput
          size="lg"
          defaultValue={1}
          min={1}
          max={4}
          border="1px"
          borderRadius="full"
          _focus={{ boxShadow: "none" }}
          onChange={(value) => {
            setNumImages(Number(value));
          }}
        >
          <NumberInputField border="none" _focus={{ boxShadow: "none" }} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <ImageCards
        selectImage={selectImage}
        setSelectImage={setSelectImage}
        images={images}
      />
    </Box>
  );
}
