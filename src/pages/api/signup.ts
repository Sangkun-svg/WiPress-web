import { supabase } from "@/utils/database";
import { hash } from "bcrypt";
import type { NextApiRequest } from "next";

export default async function signUpHandler(req: NextApiRequest) {
  try {
    const formdata = req.body.data;
    const { data: alreadyRegisteredUser } = await supabase
      .from("User")
      .select("phoneNumber")
      .eq("phoneNumber", formdata.phoneNumber);
    if (alreadyRegisteredUser!.length > 0)
      return {
        user: null,
        status: "alreadyRegistered",
      };
    const hashedPassword = await hash(formdata.password, 12);
    const { data: newUser, error: signUpError } = await supabase
      .from("User")
      .insert([
        {
          phoneNumber: formdata.phoneNumber,
          password: hashedPassword,
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
    if (newUser) return { user: newUser, status: "success" };
    if (signUpError) return { user: null, status: "fail" };
  } catch (error) {
    console.error(error);
  }
}
