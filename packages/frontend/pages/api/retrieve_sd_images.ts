import {
  createReadStream,
  createWriteStream,
  writeFile,
  writeFileSync,
} from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { Readable } from "stream";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const engineId = "stable-diffusion-512-v2-0";
  const apiHost = "https://api.stability.ai";
  const url = `${apiHost}/v1alpha/generation/${engineId}/text-to-image`;

  const body = JSON.stringify({
    cfg_scale: req.body.cfg_scale,
    clip_guidance_preset: req.body.clip_guidance_preset,
    height: req.body.height,
    width: req.body.width,
    samples: req.body.samples,
    steps: req.body.steps,
    text_prompts: [
      {
        text: req.body.prompt,
        weight: req.body.weight,
      },
    ],
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: req.body.apiKey,
    },
    body: body,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    return res.status(response.status).json({ error: response.statusText });
  }

  try {
    const imagesData = (await response.json()).artifacts;

    return res.status(200).json({ images: imagesData });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;
