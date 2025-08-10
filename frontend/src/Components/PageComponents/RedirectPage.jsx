import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react"; // spinner icon

const RedirectPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const site = params.get("site");
    const link = params.get("link");

    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = link;
        }, 3000); // 3 seconds delay

        return () => clearTimeout(timer);
    }, [link]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-2xl font-semibold text-gray-800">
                🎉 You found a great deal on StayMantra!
            </h1>
            <p className="text-lg text-gray-600 mt-2">
                Taking you to <span className="font-bold">{site}</span>...
            </p>
            <Loader2 className="animate-spin w-8 h-8 mt-5 text-green-600" />
            <p className="text-sm text-gray-500 mt-3">
                Please wait, you will be redirected shortly.
            </p>
        </div>
    );
};

export default RedirectPage;
