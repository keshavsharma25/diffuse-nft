import {
  Box,
  Flex,
  Input,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  optionsTitle: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
  isPixel?: boolean;
};

export const OptionsSliderText = ({
  optionsTitle,
  min,
  max,
  step,
  defaultValue,
  dispatch,
  isPixel = false,
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const HandleDispatchOptionsTitle = (value: number) => {
    if (optionsTitle === "Config Scale") {
      dispatch({ type: "SET_CFG_SCALE", payload: value });
    } else if (optionsTitle === "Height") {
      dispatch({ type: "SET_HEIGHT", payload: value });
    } else if (optionsTitle === "Width") {
      dispatch({ type: "SET_WIDTH", payload: value });
    } else if (optionsTitle === "Samples") {
      dispatch({ type: "SET_SAMPLES", payload: value });
    } else if (optionsTitle === "Seed") {
      dispatch({ type: "SET_SEED", payload: value });
    } else if (optionsTitle === "Steps") {
      dispatch({ type: "SET_STEPS", payload: value });
    } else if (optionsTitle === "Weight") {
      dispatch({ type: "SET_WEIGHT", payload: value });
    } else {
      console.log("Error: OptionsSliderText.tsx");
    }
  };

  useEffect(() => {
    HandleDispatchOptionsTitle(value);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [value, inputRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      let value;
      if (optionsTitle === "Weight") {
        value = parseFloat(inputRef.current.value);
      } else {
        value = parseInt(inputRef.current.value);
      }
      if (value >= min || value <= max) {
        setValue(value);
      }
    }
  };

  return (
    <Flex flexDir="column" justifyContent="center" px="2rem" py="1rem">
      <Flex alignItems="center" justifyContent="space-between" gap="2rem">
        <Text fontSize="1rem" fontWeight="semibold">
          {optionsTitle}
        </Text>
        <Flex>
          <Box>
            <Input
              size="sm"
              min={min}
              type="number"
              max={max}
              value={value === 0 && min > 0 ? "" : value}
              width="4rem"
              bgColor="whiteAlpha.900"
              borderColor="blackAlpha.700"
              onChange={handleInputChange}
              errorBorderColor="red.300"
              textAlign="center"
              borderLeftRadius="lg"
              borderRightRadius={isPixel ? "none" : "lg"}
              isInvalid={value < min || value > max}
              ref={inputRef}
            />
          </Box>
          {isPixel && (
            <Box
              bgColor="blackAlpha.800"
              color="whiteAlpha.900"
              px="1rem"
              borderRightRadius="lg"
            >
              px
            </Box>
          )}
        </Flex>
      </Flex>
      <Box pt="1rem" pb="1rem">
        <Slider
          aria-label="slider-ex-6"
          min={min}
          defaultValue={defaultValue}
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
          max={max}
          step={step}
        >
          <SliderMark
            value={min}
            fontSize="0.75rem"
            pt="0.5rem"
            textAlign="right"
          >
            {min}
          </SliderMark>
          <SliderMark value={max} fontSize="0.75rem" pt="0.5rem">
            {max}
          </SliderMark>

          <SliderTrack>
            <SliderFilledTrack bg="grey" />
          </SliderTrack>
          <SliderThumb bgColor="blackAlpha.800" />
        </Slider>
      </Box>
    </Flex>
  );
};
