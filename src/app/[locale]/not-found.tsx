import React from "react";
import NotFoundComponent from "@/components/helpers/NotFoundComponent";

export default function NotFound() {
    return (
        <div id="details-error-page" className="bg-[#1a1a1a] min-h-screen flex flex-col items-center justify-center text-white">
            <NotFoundComponent/>
        </div>
    );
}