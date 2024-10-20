"use client";
import React, { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface AnimatorRenderProps {
    animJson: any; // You can be more specific if you know the structure of animJson
    height: number;
    width: number;
    vis: "visible" | "hidden" | "collapse";
}

const AnimatorRender: React.FC<AnimatorRenderProps> = (props) => {
    const anime = useRef<HTMLDivElement>(null);
    let animation: AnimationItem | undefined;


    useEffect(() => {
        if (anime.current) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            animation = lottie.loadAnimation({
                container: anime.current,
                renderer: "svg",
                loop: true,
                autoplay: true,
                animationData: props.animJson,
            });
        }

        return () => {
            if (animation) {
                animation.destroy();
            }
        };
    }, [props.animJson]);

    return (
        <div style={{ height: props.height, width: props.width, visibility: props.vis }} ref={anime} />
    );
};

export default AnimatorRender;
