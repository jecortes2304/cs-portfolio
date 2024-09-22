import {ProjectSchema} from "@/schemas/ProjectSchemas";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {DeviceIconFactory} from "@/components/helpers/DeviceIconFactory";
import {getLocale} from "next-intl/server";

interface ProjectProps {
    project: ProjectSchema;
}

const ProjectContainer: React.FC<ProjectProps> = async ({project}: {project: ProjectSchema} ) => {
    const locale = await getLocale();

    return (
        <div className="relative group overflow-hidden rounded-lg">
            <Image
                src={project.bannerPath}
                alt={project.name}
                loading={"lazy"}
                quality={30}
                width={800}
                height={640}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="glassy absolute lg:inset-5 inset-1.5 rounded-2xl bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                <div className="p-4 rounded-lg">
                    <Link href={`/${locale}/details/${project.id}`} className="lg:text-xl md:text-sm xs:text-xs text-white hover:text-blue-400 transition-colors">
                        <h4 className="lg:text-lg text-xs font-bold">{project.name}</h4>
                    </Link>
                    <h5 className="flex text-gray-200 mt-2 justify-center text-center">
                        <DeviceIconFactory type={project.type}/>
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default ProjectContainer;