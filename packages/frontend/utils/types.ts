export interface SDConfig {
  cfg_scale: number;
  clip_guidance_preset:
    | "NONE"
    | "FAST_BLUE"
    | "FAST_GREEN"
    | "NONE"
    | "SIMPLE"
    | "SLOW"
    | "SLOWER"
    | "SLOWEST";
  height: number;
  width: number;
  sampler:
    | "NONE"
    | "DDIM"
    | "DDPM"
    | "K_DPMPP_2M"
    | "K_DPMPP_2S_ANCESTRAL"
    | "K_DPM_2"
    | "K_DPM_2_ANCESTRAL"
    | "K_EULER"
    | "K_EULER_ANCESTRAL"
    | "K_HEUN"
    | "K_LMS";
  samples: number;
  seed: number;
  steps: number;
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
