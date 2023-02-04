import { Flex, Select, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  optionsTitle: string;
  selectValues: string[];
  defaultValue: number | string;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
};

export const OptionsSelect = ({
  optionsTitle,
  selectValues,
  defaultValue,
  dispatch,
}: Props) => {
  const [value, setValue] = React.useState<string | number>(defaultValue);

  const HandleDispatchOptionsTitle = (value: string | number) => {
    if (optionsTitle === "Clip Guidance Preset") {
      dispatch({ type: "SET_CLIP_GUIDANCE_PRESET", payload: value });
    } else if (optionsTitle === "Sampler") {
      dispatch({ type: "SET_SAMPLER", payload: value });
    } else if (optionsTitle === "Width x Height") {
      dispatch({
        type: "SET_WIDTH",
        payload:
          typeof value === "string" ? parseInt(value.split("x")[0]) : value,
      });
      dispatch({
        type: "SET_HEIGHT",
        payload:
          typeof value === "string" ? parseInt(value.split("x")[0]) : value,
      });
    } else {
      console.log("Error: OptionsSelect.tsx");
    }
  };

  React.useEffect(() => {
    HandleDispatchOptionsTitle(value);
  }, [value]);

  const onChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <Flex flexFlow="column wrap" rowGap="1rem" mx="1rem">
      <Text fontSize="1rem" fontWeight="semibold">
        {optionsTitle}
      </Text>
      <Select
        size="xs"
        variant="filled"
        defaultValue={defaultValue}
        bgColor="whiteAlpha.900"
        borderColor="blackAlpha.700"
        borderWidth="1px"
        borderRadius="lg"
        onChange={onChangeValue}
        _hover={{
          bgColor: "whiteAlpha.900",
        }}
        _focus={{
          bgColor: "whiteAlpha.900",
        }}
      >
        {selectValues.map((value, index) => {
          return <option key={index}>{value}</option>;
        })}
      </Select>
    </Flex>
  );
};
