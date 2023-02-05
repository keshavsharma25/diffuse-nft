import { guidancePresetMap, samplerMap } from "@/components/frontend/Settings";
import { SDConfig } from "./types";

export const initialSettingsState: SDConfig = {
  width: 512,
  height: 512,
  seed: 0,
  steps: 50,
  samples: 1,
  cfg_scale: 7,
  clip_guidance_preset: guidancePresetMap.GUIDANCE_PRESET_NONE,
  sampler: samplerMap.SAMPLER_K_DPMPP_2M,
};
