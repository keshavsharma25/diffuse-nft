import { guidancePresetMap, samplerMap } from "@/components/frontend/Settings";
import { SDConfig } from "./types";

export const initialSettingsState: SDConfig = {
  cfg_scale: 7,
  clip_guidance_preset: guidancePresetMap.GUIDANCE_PRESET_NONE,
  height: 512,
  width: 512,
  sampler: samplerMap.SAMPLER_K_DPMPP_2M,
  samples: 1,
  seed: 0,
  steps: 50,
  weight: 1,
};
