// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  type: string;
  items: string[];
  title: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    process.env.NEXT_PUPLIC_REPLICATE_API_KEY as string
  );
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    version: "27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
    input: {
      prompt: req.body.prompt,
      mask: req.body.mask,
      num_outputs: req.body.num_outputs,
      seed: 42,
    },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.replicate.com/v1/predictions", requestOptions as any);
}
