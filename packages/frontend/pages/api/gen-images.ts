import type { NextApiRequest, NextApiResponse } from "next";
import { CreateImageRequest } from "openai";
import { openai } from "@/utils/openai";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt, n, size, response_format, user } = req.body;

  const requestOptions: CreateImageRequest = {
    prompt,
    n,
    size,
    response_format,
    user,
  };

  try {
    const response = await openai.createImage(requestOptions);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
