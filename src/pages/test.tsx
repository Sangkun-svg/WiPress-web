import React , {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

export default function Profile() {
  const supabase = createClientComponentClient();
  const [images, setImages] = useState<Array<string> | string | null>();
  const [imagePath, setImagePath] =useState<Array<string> | null>();

  const uploadImageFile = async (event: React.ChangeEvent<any>) => {
    const file = event.target.files;
    if(file.length === 0) return;
    if(file.length === 1) {
      console.warn("Selected Just One File!")
      console.log("file[0]" ,file[0])
      const { data, error } = await supabase.storage
      .from("POST")
      .upload("images/"+ uuidv4(), file[0]);

      setImagePath([(data as any).fullPath]);
    };
    if(file.length > 1) {
      console.warn("Selected many files!")
      const result = await Promise.all(
        Object.values(file).map((image:any,idx:number) => {
          return supabase.storage
          .from("POST")
          .upload("images/"+ uuidv4(), image);
        })
      );
      setImagePath(result.map(el => (el.data as any).fullPath))
    }
  };

  return (
    <div>
      <h1>Upload Profile Photo</h1>
      <input type="file" multiple accept='image/*' onChange={uploadImageFile} />
      {imagePath && imagePath.map((el:string) => {
        return <Image 
        alt='test'
        src={"https://jjgkztugfylksrcdbaaq.supabase.co/storage/v1/object/public/" + el}
        width={300}
        height={300}
      />
    })

      }
    </div>
  );
}
