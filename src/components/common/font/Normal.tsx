interface Props {
    children: React.ReactNode
}

const NormalType = (props:Props) => {
    return <p className="text-white text-center text-sm not-italic font-normal leading-[100%] tracking-[0.14px]">{props.children}</p>
};

export default NormalType;
