import { supabase } from "@/utils/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function requestPostHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const formdata = req.body.data;
  } catch (error) {
    throw new Error("requestPost Error");
  }
}
