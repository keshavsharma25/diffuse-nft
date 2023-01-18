import { initialSettingsState } from "@/utils/initialState";
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
      selectValues: clipGuidancePresetOptions,
      defaultValue: initialSettingsState.clip_guidance_preset,
      dispatch: dispatch,
    },
    {
      optionsTitle: "Sampler",
      selectValues: samplerOptions,
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
    {
      optionsTitle: "Weight",
      defaultValue: initialSettingsState.weight,
      min: -1,
      max: 1,
      step: 0.1,
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
