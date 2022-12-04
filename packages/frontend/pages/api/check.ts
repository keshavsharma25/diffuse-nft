import { Data } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  setTimeout(async () => {}, 5000);

  const newHeaders = new Headers();
  newHeaders.append(
    "Authorization",
    ("Token " + process.env.NEXT_PUBLIC_REPLICATE_API_KEY) as string
  );

  const newRequestOptions = {
    method: "GET",
    headers: newHeaders,
    redirect: "follow",
  };

  try {
    const checkReplicate = await (
      await fetch(
        `https://api.replicate.com/v1/predictions/${req.query.id}`,
        newRequestOptions as any
      )
    ).json();

    if (checkReplicate.status === "succeeded") {
      res.status(200).json({
        id: checkReplicate.id,
        status: "success",
        items: checkReplicate.output,
      });
    } else if (checkReplicate.status === "processing") {
      res.status(200).json({
        id: checkReplicate.id,
        status: "processing",
        items: [],
      });
    } else {
      res.status(500).json({
        id: "",
        status: "error",
        items: ["Something went wrong"],
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      items: ["Something went wrong"],
    });
  }
}
