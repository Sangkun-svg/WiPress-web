import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label:string; 
}

const InputWithLabel = ({label , ...rest}: InputProps) => {
    return <input className='w-full rounded-md bg-white' {...rest}/>
};

export default InputWithLabel;
