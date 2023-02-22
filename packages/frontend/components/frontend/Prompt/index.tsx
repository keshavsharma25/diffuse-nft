import { useGenImages } from "@/hooks/useGenImages";
import {
  Button,
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";
import { TfiSearch } from "react-icons/tfi";
import { AsNavFor } from "./caroussel";

type Props = {};

export function Prompt({}: Props) {
  const [prompt, setPrompt] = React.useState<string>("");
  const [finalPrompt, setFinalPrompt] = React.useState<string>("");
  const [numImages, setNumImages] = React.useState<number>(1);
  const [images, setImages] = React.useState<string[]>([]);

  const handleOnChangePrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleOnChangeNumImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumImages(parseInt(e.target.value));
  };

  let result: string[] = [];

  result = useGenImages(finalPrompt, numImages);

  const handleOnClickPrompt = () => {
    setFinalPrompt(prompt);
    setImages(result);
  };

  return (
    <>
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
            onClick={handleOnClickPrompt}
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
        >
          <NumberInputField
            border="none"
            _focus={{ boxShadow: "none" }}
            onChange={handleOnChangeNumImages}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <AsNavFor images={images} />
    </>
  );
}
