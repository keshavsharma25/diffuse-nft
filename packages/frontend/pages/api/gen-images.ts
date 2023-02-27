import { openai } from "@/utils/openai";
import type { NextApiRequest, NextApiResponse } from "next";
import { CreateImageRequest } from "openai";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt, n, size, response_format, user } = req.body;

  try {
    const { data } = await openai.createImage({
      prompt: prompt,
      n: n,
      size: size,
      response_format: response_format,
      user: user,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default handler;
