"use client";
import Link from "next/link";
import {renderIcon} from "@/components/helpers/DeviceIconFactory";
import React from "react";


const FirstLineSection = ({projectName,}: { projectName: string }) => {

    return (
        <div className="flex justify-between items-center mb-16">
            <div className={"flex float-start gap-4"}>
                <Link href="/" className="text-blue-400 hover:text-blue-300">
                    {renderIcon("Home", "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6")}
                </Link>
                <Link href="/#portfolio" className="text-blue-400 hover:text-blue-300">
                    {renderIcon("Atrás", "M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3")}
                </Link>
            </div>
            <h1 className="text-xl lg:text-4xl font-bold">{projectName}</h1>
        </div>
    )
}


export default FirstLineSection;