import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
    return (
        <div className="p-5 mt-4 rounded-xl shadow-md flex items-center text-left">
            {children}
        </div>
    );
}

export default Card;