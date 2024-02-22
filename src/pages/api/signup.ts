import { supabase } from "@/utils/database";
import type { NextApiRequest } from "next";

export default async function signUpHandler(req: NextApiRequest) {
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
    if (data) return data;
    if (signUpError) return console.error(signUpError);
    return data;
  } catch (error) {
    console.error(error);
  }
}
