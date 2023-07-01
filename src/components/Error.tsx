import React from "react";

const ErrorComponent: React.FC<{ errorMessage: string }> = ({ errorMessage }) => {
    return (
        <div className="my-4 text-sm text-red-500">An error occurred: {errorMessage}</div>
    );
}

export default ErrorComponent;