// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Data } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const headers = {
    Authorization: "Token " + process.env.NEXT_PUBLIC_REPLICATE_API_KEY,
    "Content-Type": "application/json",
  };

  const url = "https://api.replicate.com/v1/predictions";

  try {
    const data = await (
      await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          version:
            "f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1",
          input: { prompt: req.body.prompt },
        }),
        redirect: "follow",
      })
    ).json();

    if (data.details) {
      res.status(401).json({
        status: "error",
        items: [data.details],
      });
    } else if (data.created_at) {
      res.status(200).json({
        id: data.id,
        status: "created",
        items: [],
      });
    } else {
      res.status(500).json({
        status: "error",
        items: [data],
      });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({
        status: "error",
        items: [error.message],
      });
    }
  }
}
