import { supabase } from "@/utils/database";
import { hash } from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function signUpHandler(req: NextApiRequest, res: NextApiResponse) {
    const formData = req.body.data;
    const { data: alreadyRegisteredUser } = await supabase
      .from("User")
      .select("phoneNumber")
      .eq("phoneNumber", formData.phoneNumber);

    if (alreadyRegisteredUser && alreadyRegisteredUser.length > 0) {
      return res.status(206).json({ user: null, status: "error", error: "이미 가입된 번호입니다." });
    }

    const hashedPassword = await hash(formData.password, 12);
    const { data: newUser, error: signUpError } = await supabase
      .from("User")
      .insert([
        {
          phoneNumber: formData.phoneNumber,
          password: hashedPassword,
          name: formData.name,
          birth: formData.birth,
          address: formData.address + formData.addressDetail,
          party: formData.party,
          position: formData.position,
          agreePushAlarm: formData.agreePushAlarm,
          type: formData.type,
        },
      ]).select("*");

    if (signUpError) {
      return res.status(207).json({ user: null, status: "fail", error: "Signup failed" });
    }

    return res.status(200).json({ user: newUser, status: "success" });
}
