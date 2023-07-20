import { type } from 'os';
import React, { useState } from 'react'

interface MarqueeTextProps {
    children: string;
    width: number;
    maxLength: number;
    textSize?:number
}

const MarqueeText: React.FC<MarqueeTextProps> = ({ children, width, maxLength, textSize }) => {
    return (
        <div
            className={`overflow-hidden truncate`}
            style={{
                width: width + "px",
            }}>
            <p className={`${children.length > maxLength ? "animate-marquee" : ""} text-[${textSize ?? 12}px]`}>
                {children}
            </p>
        </div>
    )
}

export default MarqueeText