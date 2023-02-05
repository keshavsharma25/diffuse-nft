import { initialSettingsState } from "@/utils/initialState";
import {
  DiffusionSamplerMap,
  GuidancePresetMap,
} from "@/utils/stability-ai-gen/generation_pb";
import { SDConfig } from "@/utils/types";
import { Collapse, Flex, SimpleGrid, WrapItem } from "@chakra-ui/react";
import { OptionsSelect } from "./OptionsSelect";
import { OptionsSliderText } from "./OptionsSliderText";

type Props = {
  isOpen: boolean;
  settings: SDConfig;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
};

export const guidancePresetMap: GuidancePresetMap = {
  GUIDANCE_PRESET_NONE: 0,
  GUIDANCE_PRESET_SIMPLE: 1,
  GUIDANCE_PRESET_FAST_BLUE: 2,
  GUIDANCE_PRESET_FAST_GREEN: 3,
  GUIDANCE_PRESET_SLOW: 4,
  GUIDANCE_PRESET_SLOWER: 5,
  GUIDANCE_PRESET_SLOWEST: 6,
};

export const samplerMap: DiffusionSamplerMap = {
  SAMPLER_DDIM: 0,
  SAMPLER_DDPM: 1,
  SAMPLER_K_EULER: 2,
  SAMPLER_K_EULER_ANCESTRAL: 3,
  SAMPLER_K_HEUN: 4,
  SAMPLER_K_DPM_2: 5,
  SAMPLER_K_DPM_2_ANCESTRAL: 6,
  SAMPLER_K_LMS: 7,
  SAMPLER_K_DPMPP_2S_ANCESTRAL: 8,
  SAMPLER_K_DPMPP_2M: 9,
  SAMPLER_K_DPMPP_SDE: 10,
};

const widthHeightOptions = [
  "512x512",
  "768x512",
  "704x512",
  "640x512",
  "576x512",
  "640x640",
  "512x576",
  "512x640",
  "512x704",
  "512x768",
  "1280x768",
  "768x1280",
  "1024x1024",
];

export const Settings = ({ isOpen, settings, dispatch }: Props) => {
  const selectOptions = [
    {
      optionsTitle: "Width x Height",
      selectValues: widthHeightOptions,
      defaultValue: `${initialSettingsState.width}x${initialSettingsState.height}`,
      dispatch: dispatch,
    },
    {
      optionsTitle: "Clip Guidance Preset",
      selectValues: Object.keys(guidancePresetMap),
      defaultValue: initialSettingsState.clip_guidance_preset,
      dispatch: dispatch,
    },
    {
      optionsTitle: "Sampler",
      selectValues: Object.keys(samplerMap),
      defaultValue: initialSettingsState.sampler,
      dispatch: dispatch,
    },
  ];

  const sliderOptions = [
    {
      optionsTitle: "Samples",
      defaultValue: initialSettingsState.samples,
      min: 1,
      max: 10,
      step: 1,
      dispatch: dispatch,
    },
    {
      optionsTitle: "Steps",
      defaultValue: initialSettingsState.steps,
      min: 10,
      max: 150,
      step: 10,
      dispatch: dispatch,
    },
    {
      optionsTitle: "Seed",
      defaultValue: initialSettingsState.seed,
      min: 0,
      max: 1000,
      step: 1,
      dispatch: dispatch,
    },
    {
      optionsTitle: "Config Scale",
      defaultValue: initialSettingsState.cfg_scale,
      min: 0,
      max: 35,
      step: 1,
      dispatch: dispatch,
    },
  ];

  return (
    <>
      <Collapse in={isOpen} animateOpacity>
        <Flex flexDirection="column" py="1rem" px="1rem">
          <SimpleGrid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            columnGap="0.5rem"
          >
            {selectOptions.map((option) => {
              return (
                <WrapItem key={option.optionsTitle}>
                  <OptionsSelect
                    optionsTitle={option.optionsTitle}
                    selectValues={option.selectValues}
                    defaultValue={option.defaultValue}
                    dispatch={option.dispatch}
                  />
                </WrapItem>
              );
            })}
            {sliderOptions.map((option) => {
              return (
                <WrapItem key={option.optionsTitle}>
                  <OptionsSliderText
                    optionsTitle={option.optionsTitle}
                    defaultValue={option.defaultValue}
                    min={option.min}
                    max={option.max}
                    step={option.step}
                    dispatch={option.dispatch}
                  />
                </WrapItem>
              );
            })}
          </SimpleGrid>
        </Flex>
      </Collapse>
    </>
  );
};
