import { supabase } from "@/utils/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function signInHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const formdata = req.body.data;
  } catch (signUpError) {
    throw new Error("SIGNIN Error");
  }
}
