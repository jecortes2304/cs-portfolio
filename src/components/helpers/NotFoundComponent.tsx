import AnimatorRender from "@/components/animations/AnimnationRender";
import errorPageJson from "@/components/animations/error_page.json";
import Link from "next/link";
import {HomeIcon} from "@heroicons/react/24/outline";
import React from "react";

interface NotFoundComponentProps {
    description: string;
    message: string;
}


const NotFoundComponent: React.FC<NotFoundComponentProps> = ({
    description,
    message,
                                                             }) => {

    return (
        <div className="container mx-auto text-center justify-center">
            <div className="my-8 flex justify-center">
                <AnimatorRender animJson={errorPageJson} height={250} width={300} vis="visible"/>
            </div>
            <h4 className="text-2xl font-semibold mb-4">{message}</h4>
            <p className="mb-8">{description}</p>
            <Link href="/#hero" className="text-lg text-blue-500 flex justify-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center ms-1" title={"Home"}>
                    <div className="p-2 rounded-full border border-white text-blue-400 hover:bg-white">
                        <HomeIcon className="h-6 w-6"/>
                    </div>
                </div>
            </Link>
        </div>
    )
}


export default NotFoundComponent;