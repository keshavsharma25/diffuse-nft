import type { NextApiRequest, NextApiResponse } from "next";

import { openai } from "@/utils/openai";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { image, mask, prompt, n, size, response_format, user } = req.body;

  try {
    const response = await openai.createImageEdit(
      image,
      mask,
      prompt,
      n,
      size,
      response_format,
      user
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
