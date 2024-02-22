import { supabase } from "@/utils/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function signInHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const formdata = req.body.data;
    let { data, error: signinError } = await supabase
      .from("User")
      .select("phoneNumber,password")
      .eq("phoneNumber", formdata.phoneNumber)
      .eq("password", formdata.password)
      .select();
    if (data) return console.log({ data });
    if (signinError) return console.error({ signinError });
  } catch (error) {
    throw new Error("SIGNIN Error");
  }
}
