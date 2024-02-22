import { supabase } from "@/utils/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const formdata = req.body.data;
    const { data, error: signUpError } = await supabase
      .from("User")
      .insert([
        {
          phoneNumber: formdata.phoneNumber,
          password: formdata.password,
          name: formdata.name,
          birth: formdata.birth,
          address: formdata.address + formdata.addressDetail,
          party: formdata.party,
          position: formdata.position,
          agreePushAlarm: formdata.agreePushAlarm,
          type: formdata.type,
        },
      ])
      .select();
    if (signUpError) return signUpError;
    return data;
  } catch (signUpError) {
    throw new Error("SIGN UP Error");
  }
}
