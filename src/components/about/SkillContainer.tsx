import React from "react";

interface SkillProps {
    name: string;
    percent: number;
}

const SkillContainer: React.FC<SkillProps> = ({ name, percent }: SkillProps) => {

    return (
        <div className="mb-4 w-full md:w-1/2 lg:w-1/4 px-2">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-white">{name}</span>
                <span className="text-sm font-medium text-white">{percent}%</span>
            </div>
            <progress className="progress progress-custom-color w-full" value={percent} max="100"></progress>
        </div>
    );
}

export default SkillContainer;