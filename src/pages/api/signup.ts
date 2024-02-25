import { supabase } from "@/utils/database";
import { hash } from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
// TODO: 성공적 회원가입 이후 redirect 
export default async function signUpHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formdata = req.body.data;
    console.log({ formdata });
    
    const { data: alreadyRegisteredUser } = await supabase
      .from("User")
      .select("phoneNumber")
      .eq("phoneNumber", formdata.phoneNumber);
    console.log({ alreadyRegisteredUser });

    if (alreadyRegisteredUser && alreadyRegisteredUser.length > 0) {
      return res.status(400).json({ user: null , status: "error" ,error: "User already exists" });
    }

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
      ]);

    if(signUpError){
      return res.status(500).json({ user:null, status: "fail",error: "Signup failed" });
    }
    if (newUser) {
      return res.status(200).json({ user: newUser, status: "success" });
    } 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
