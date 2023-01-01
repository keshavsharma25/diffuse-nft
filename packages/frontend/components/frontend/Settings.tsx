import { SDConfig } from "@/utils/types";
import { Box, Collapse, Flex } from "@chakra-ui/react";
import { OptionsSliderText } from "./OptionsSliderText";
import { initialSettingsState } from "@/utils/initialState";
import { OptionsSelect } from "./OptionsSelect";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  settings: SDConfig;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
};

const clipGuidancePresetOptions = [
  "NONE",
  "FAST_BLUE",
  "FAST_GREEN",
  "NONE",
  "SIMPLE",
  "SLOW",
  "SLOWER",
  "SLOWEST",
];

const samplerOptions = [
  "NONE",
  "DDIM",
  "DDPM",
  "K_DPMPP_2M",
  "K_DPMPP_2S_ANCESTRAL",
  "K_DPM_2",
  "K_DPM_2_ANCESTRAL",
  "K_EULER",
  "K_EULER_ANCESTRAL",
  "K_HEUN",
  "K_LMS",
];

export const Settings = ({ isOpen, settings, dispatch }: Props) => {
  return (
    <>
      <Collapse in={isOpen} animateOpacity>
        <Flex
          justifyContent="center"
          flexDirection="column"
          mx="15rem"
          mt="1rem"
          px="2rem"
          bgColor="blackAlpha.200"
          borderRadius="3xl"
        >
          <Box
            fontSize="1.5rem"
            fontWeight="semibold"
            mb="1rem"
            px="1rem"
            pt="1rem"
            alignSelf="center"
          >
            Advanced Options
          </Box>
          <Flex
            flexFlow="row wrap"
            justifyContent="space-between"
            columnGap="4rem"
            rowGap="1rem"
          >
            <OptionsSliderText
              optionsTitle="Height"
              min={512}
              max={2048}
              step={2}
              defaultValue={initialSettingsState.height}
              dispatch={dispatch}
              isPixel={true}
            />
            <OptionsSliderText
              optionsTitle="Width"
              min={512}
              max={2048}
              step={2}
              defaultValue={initialSettingsState.width}
              dispatch={dispatch}
              isPixel={true}
            />
            <OptionsSliderText
              optionsTitle="Samples"
              min={1}
              max={10}
              step={1}
              defaultValue={initialSettingsState.samples}
              dispatch={dispatch}
            />
            <OptionsSliderText
              optionsTitle="Steps"
              min={10}
              max={150}
              step={10}
              defaultValue={initialSettingsState.steps}
              dispatch={dispatch}
            />
            <OptionsSliderText
              optionsTitle="Seed"
              min={0}
              max={1000}
              step={1}
              defaultValue={initialSettingsState.seed}
              dispatch={dispatch}
            />
            <OptionsSliderText
              optionsTitle="Config Scale"
              min={0}
              max={35}
              step={1}
              defaultValue={initialSettingsState.cfg_scale}
              dispatch={dispatch}
            />

            <OptionsSelect
              optionsTitle="Clip Guidance Preset"
              selectValues={clipGuidancePresetOptions}
              defaultValue={initialSettingsState.clip_guidance_preset}
              dispatch={dispatch}
            />
            <OptionsSelect
              optionsTitle="Sampler"
              selectValues={samplerOptions}
              defaultValue={initialSettingsState.sampler}
              dispatch={dispatch}
            />
          </Flex>
        </Flex>
      </Collapse>
    </>
  );
};
