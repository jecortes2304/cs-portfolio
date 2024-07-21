"use client"
import React, {useCallback, useEffect} from 'react';
import Image from 'next/image';
import {Gallery, Item} from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import Rotate from '@/utils/rotate';
import {getProjectImages} from "@/lib/request/project/project";

interface GalleryClientProps {
    projectName: string;
    bannerPath: string;
    projectType: string;
}

export default function GalleryClient({projectName, bannerPath, projectType}: GalleryClientProps) {
    const imageSizeWidth = projectType === "mobile" ? 300 : 1024;
    const imageSizeHeight = projectType === "mobile" ? 600 : 600;
    const [projectImages, setProjectImages] = React.useState<string[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const formatProjectNameToFetchImages = useCallback((projectNameToFetch: string): string => {
        const resultProjectName = projectNameToFetch.toLowerCase().replaceAll(" ", "_")
        return removeAccents(resultProjectName);
    }, []);

    const removeAccents = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const getImagesFromProject = useCallback(async () => {
        setIsLoading(true);
        const projectImagesFetched = await getProjectImages(formatProjectNameToFetchImages(projectName));
        setProjectImages(projectImagesFetched)
        setIsLoading(false);
    }, [projectName, formatProjectNameToFetchImages]);

    useEffect(() => {
        getImagesFromProject().then();
    }, [getImagesFromProject]);

    return (
        <Gallery withDownloadButton withCaption uiElements={Rotate}>
            <Item
                original={bannerPath}
                thumbnail={bannerPath}
                width={1000}
                height={670}
            >
                {({ref, open}) => (
                    isLoading ?
                        (
                            <div className="flex justify-center items-center h-[300px]">
                                <span className="loading loading-ring loading-lg"></span>
                            </div>
                        ) :
                    <Image
                        className="rounded-lg object-cover object-center bg-gray-300 w-full h-auto cursor-pointer"
                        ref={ref as React.Ref<HTMLImageElement>}
                        onClick={open}
                        priority={true}
                        src={bannerPath}
                        alt={`${projectName} banner`}
                        width={1000}
                        height={600}
                    />
                )}
            </Item>
            {projectImages.map((image, index) => (
                image && !image.includes("logo") && (
                    <Item
                        key={index}
                        original={image}
                        caption={`${projectName} image ${index + 1}`}
                        thumbnail={image}
                        width={imageSizeWidth}
                        height={imageSizeHeight}
                    >
                        {({ref}) => (
                            <div style={{display: 'none'}}>
                                <Image
                                    ref={ref as React.Ref<HTMLImageElement>}
                                    src={image}
                                    priority={true}
                                    quality={100}
                                    style={{width: "auto", height: "auto"}}
                                    alt={`${projectName} image ${index + 1}`}
                                    width={imageSizeWidth}
                                    height={imageSizeHeight}
                                />
                            </div>
                        )}
                    </Item>
                )
            ))}
        </Gallery>
    );
}