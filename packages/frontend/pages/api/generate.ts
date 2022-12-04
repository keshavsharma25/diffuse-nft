// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Data } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const myHeaders = new Headers();

  myHeaders.append(
    "Authorization",
    ("Token " + process.env.NEXT_PUBLIC_REPLICATE_API_KEY) as string
  );
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    version: "27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
    input: {
      prompt: req.body.prompt,
      seed: 42,
    },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const data = await (
      await fetch(
        "https://api.replicate.com/v1/predictions",
        requestOptions as any
      )
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
        items: ["Something went wrong"],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      items: ["Something went wrong"],
    });
  }
}
