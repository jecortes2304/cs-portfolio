import Image from "next/image";
import React from "react";
import {ProjectSchema} from "@/schemas/ProjectSchemas";
import StatusIconFactory from "@/components/helpers/StatusIconFactory";
import {DeviceIconFactory, renderIcon} from "@/components/helpers/DeviceIconFactory";
import Link from "next/link";
import { useTranslations } from 'next-intl';

const LinkIcon = ({url, title, path}: { url: string, title: string, path: string }) => {
    return (
        <Link href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
            {renderIcon(title, path)}
        </Link>
    );
}

const DetailItem = ({label, value, icon,}: { label: string, value?: string, icon?: React.ReactNode }) => {
    return (
        <div className="flex items-center justify-between gap-x-10">
            <span className="text-sm lg:text-lg font-semibold w-32">{label}: </span>
            {icon ? icon : <span className={"text-sm text-justify text-gray-400"}>{value}</span>}
        </div>
    );
}

const InfoProjectSection: React.FC<{ project: ProjectSchema }> = ({project}: { project: ProjectSchema }) => {
    const t = useTranslations('DetailsPage.InfoProjectSection');

    return (
        <div className="md:w-1/2 space-y-6">
            <DetailItem label={t('logo')}
                        icon={
                            <Image src={project.logoPath}
                                   alt={t('logoAlt')}
                                   className={"rounded-lg object-cover object-center bg-gray-300"}
                                   style={{width: 40, height: 40}}
                                   width={50}
                                   height={50}/>
                        }/>
            <DetailItem label={t('type')} icon={<DeviceIconFactory type={project.type}/>}/>
            <DetailItem label={t('status')} icon={<StatusIconFactory status={project.status}/>}/>
            <DetailItem label={t('github')} icon={
                <LinkIcon url={project.repositoryUrl}
                          title={t('repositoryUrl')}
                          path={"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"}/>
            }/>
            {
                project.publishUrl && project.publishUrl.length > 0 && (
                    <DetailItem label={t('published')} icon={
                        <LinkIcon url={project.publishUrl}
                                  title={t('publishUrl')}
                                  path={"M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"}/>
                    }/>
                )
            }

            <DetailItem label={t('technologies')} value={project.techStack.join(', ')}/>
            <div className={""}>
                <h4 className="text-sm lg:text-lg font-semibold mb-2">{t('description')}:</h4>
                <p className={"text-justify text-sm text-gray-400"}>{project.description}</p>
            </div>
        </div>
    )
}

export default InfoProjectSection;