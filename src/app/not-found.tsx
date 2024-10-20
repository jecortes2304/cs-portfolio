import React from "react";
import NotFoundComponent from "@/components/helpers/NotFoundComponent";


export default function NotFound() {

    return (
        <html lang="en">
        <body>
        <div id="details-error-page"
             className="bg-[#1a1a1a] min-h-screen flex flex-col items-center justify-center text-white">
            <NotFoundComponent message={"Page not found"}
                               description={"The page you are looking for does not exist or has been moved."}/>
        </div>
        </body>
        </html>
    );
}