import { SDConfig } from "./types";

export const initialSettingsState: SDConfig = {
  cfg_scale: 7,
  clip_guidance_preset: "NONE",
  height: 512,
  width: 512,
  sampler: "NONE",
  samples: 1,
  seed: 0,
  steps: 50,
};
