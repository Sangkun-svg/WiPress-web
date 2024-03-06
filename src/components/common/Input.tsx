import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label:string; 
}

const BasicInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
    return <input 
            className='w-full max-h-50px rounded-6px'
            {...props}
            style={{padding: "18px 16px"}}
        />
};

export default BasicInput;
