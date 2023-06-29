interface LoadingProps {
    statusType: string;
}

const Loading: React.FC<LoadingProps> = ({ statusType }) => {
    return (
        <div className="flex justify-center items-center text-center space-x-2 animate-pulse">
            <div className="h-5 rounded-full flex-grow">{`Loading ${statusType}...`}</div>
        </div>
    );
}

export default Loading;