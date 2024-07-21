import NotFoundComponent from "@/components/helpers/NotFoundComponent";
import React from "react";

export default function NotFound() {
    return (
        <html lang={"es"}>
        <body>
        <div id="root-error-page"
             className="bg-[#1a1a1a] min-h-screen flex flex-col items-center justify-center text-white">
            <NotFoundComponent/>
        </div>
        </body>
        </html>
    );
}