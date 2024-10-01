interface TitleProps {
    text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
    return (
        <span className="text-md font-semibold dark:text-white">{text}</span>
    );
};

export default Title;
