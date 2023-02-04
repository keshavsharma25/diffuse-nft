import { GuidancePresetMap } from "./stability-ai-gen/generation_pb";

export interface SDConfig {
  cfg_scale: number;
  clip_guidance_preset: number;
  height: number;
  width: number;
  sampler: number;
  samples: number;
  seed: number;
  steps: number;
  weight: number;
  prompt?: string;
  apiKey?: string;
}

export interface ResponseType {
  status: number;
  items: ItemType[] | undefined;
  error?: string;
}

export interface ItemType {
  base64: string;
  seed: number;
  finishReason: string;
}
