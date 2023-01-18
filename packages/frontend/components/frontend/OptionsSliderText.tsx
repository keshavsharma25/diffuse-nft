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
  const labelStyles = {
    mt: "2",
    ml: "-1.5",
    pt: "0.3",
    fontSize: "0.8rem",
  };

  const HandleDispatchOptionsTitle = (value: number) => {
    if (optionsTitle === "Config Scale") {
      dispatch({ type: "SET_CFG_SCALE", payload: value });
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
  }, [value, inputRef]);

  return (
    <Flex flexDir="column" justifyContent="center" mx="1rem" py="1rem">
      <Flex alignItems="center" justifyContent="space-between" gap="2rem">
        <Text fontSize="1rem" fontWeight="semibold">
          {optionsTitle}
        </Text>
        <Flex>
          <Box>
            <Input
              size="xs"
              min={min}
              type="number"
              max={max}
              value={value}
              width="2.5rem"
              bgColor="whiteAlpha.900"
              borderColor="blackAlpha.700"
              errorBorderColor="red.300"
              textAlign="center"
              borderLeftRadius="lg"
              borderRightRadius={isPixel ? "none" : "lg"}
              ref={inputRef}
              pointerEvents="none"
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
      <Box pt="0.5rem">
        <Slider
          aria-label="slider-ex-6"
          min={min}
          defaultValue={defaultValue}
          value={value}
          onChange={(value) => {
            if (value >= min || value <= max) {
              setValue(value);
            }
          }}
          max={max}
          step={step}
        >
          <SliderMark value={min} {...labelStyles}>
            {min}
          </SliderMark>

          {(min + max) % 2 === 0 ? (
            <>
              <SliderMark value={(min + max) / 2} {...labelStyles}>
                {(min + max) / 2}
              </SliderMark>
            </>
          ) : (
            <></>
          )}

          <SliderMark value={max} {...labelStyles}>
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
