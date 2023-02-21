import type { NextApiRequest, NextApiResponse } from "next";
import { CreateImageRequest } from "openai";
import { openai } from "@/utils/openai";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { image, n, size, response_format, user } = req.body;

  try {
    const response = await openai.createImageVariation(
      image,
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
