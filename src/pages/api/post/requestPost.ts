import { supabase } from "@/utils/database";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function requestPostHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const formdata = req.body.data;
    const { data: newPost, error: PostingError } = await supabase
    .from("Post")
    .insert([
      {
        title: formdata.title,
        subtitle: formdata.subtitle,
        content: formdata.content,
        user_id: formdata.user_id,
        type: formdata.post_type,
      },
    ])
    .select("id");
    if(PostingError) {
      console.error(PostingError)
      throw new Error(PostingError.message)
    }
    return res.status(200).json({newPost:newPost![0]});
  } catch (error) {
    console.error("ERROR : " ,error);
    throw new Error("requestPost Error");
  }
}
