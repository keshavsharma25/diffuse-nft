import { Data } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  setTimeout(async () => {}, 5000);

  const headers = {
    Authorization: "Token " + process.env.NEXT_PUBLIC_REPLICATE_API_KEY,
    "Content-Type": "application/json",
  };

  try {
    console.log("id inside check.ts", req.query.id);

    const checkReplicate = await (
      await fetch(`https://api.replicate.com/v1/predictions/${req.query.id}`, {
        method: "GET",
        headers: headers,
        redirect: "follow",
      })
    ).json();

    console.log("checkReplicate", checkReplicate);

    if (checkReplicate.status === "succeeded") {
      return res.status(200).json({
        id: checkReplicate.id,
        status: "succeeded",
        items: checkReplicate.output,
      });
    } else if (checkReplicate.status === "processing") {
      return res.status(200).json({
        id: checkReplicate.id,
        status: "processing",
        items: [],
      });
    } else if (checkReplicate.status === "failed") {
      return res.status(500).json({
        id: checkReplicate.id,
        status: "failed",
        items: [],
      });
    } else if (checkReplicate.status === "cancelled") {
      return res.status(500).json({
        id: checkReplicate.id,
        status: "cancelled",
        items: [],
      });
    } else {
      return res.status(500).json({
        id: checkReplicate.id,
        status: "error",
        items: [],
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.message }));
      return;
    }
  }
}
