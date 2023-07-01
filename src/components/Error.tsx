import React from "react";

const ErrorComponent: React.FC<{ errorMessage: string,
     labelMessage: string }> = ({ errorMessage, labelMessage }) => {
    return (
        <>
            <div className="my-4 text-sm text-red-500">An error occurred for <strong>{labelMessage}</strong>: {errorMessage}</div>
            <div className='h-[0.04px] bg-white opacity-20 mx-5'></div>
        </>
    );
}

export default ErrorComponent;