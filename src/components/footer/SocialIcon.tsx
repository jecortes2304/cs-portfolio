import React, {ReactNode} from "react";

interface SocialIconProps {
    href: string;
    icon: ReactNode;
    color: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, color }: { href: string; icon: ReactNode; color: string }) => {
    return (
        <li>
            <a href={href} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={color} className="w-3 h-3">
                    {icon}
                </svg>
            </a>
        </li>
    );
}

export default SocialIcon;