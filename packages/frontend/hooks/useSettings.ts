import { SDConfig } from "@/utils/types";
import { useReducer } from "react";
import { initialSettingsState } from "@/utils/initialState";

function reducer(
  state: SDConfig,
  action: { type: string; payload: any }
): SDConfig {
  switch (action.type) {
    case "SET_CFG_SCALE":
      return { ...state, cfg_scale: action.payload };
    case "SET_CLIP_GUIDANCE_PRESET":
      return { ...state, clip_guidance_preset: action.payload };
    case "SET_HEIGHT":
      return { ...state, height: action.payload };
    case "SET_WIDTH":
      return { ...state, width: action.payload };
    case "SET_SAMPLER":
      return { ...state, sampler: action.payload };
    case "SET_SAMPLES":
      return { ...state, samples: action.payload };
    case "SET_SEED":
      return { ...state, seed: action.payload };
    case "SET_STEPS":
      return { ...state, steps: action.payload };
    default:
      return state;
  }
}

export const useSettings = () => {
  return useReducer(reducer, initialSettingsState);
};
