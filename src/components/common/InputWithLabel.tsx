import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label:string; 
}

const InputWithLabel = ({label , ...rest}: InputProps) => {
    return (
        <div className='flex flex-col w-full gap-2.5'>
            <label className='text-[15px] not-italic font-medium leading-[100%]'>{label}</label>
            <input className='w-full max-h-[50px] px-4 py-[18px] rounded-md' {...rest}/>
        </div>
    )
};

export default InputWithLabel;
