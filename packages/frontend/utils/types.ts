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
  samples: number;
  seed: number;
  steps: number;
  prompt: string;
  apiKey: string;
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
