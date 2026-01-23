'use client';

import React from 'react';

export default function MotifBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03] overflow-hidden">
            {/* Subtle Paisley or Pattern (SVG could be injected here) */}
            <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="motif" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M50 10l5 15h15l-12 10 5 15-13-10-13 10 5-15-12-10h15z" fill="currentColor" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#motif)" />
            </svg>
        </div>
    );
}
