'use client';

import React from 'react';

interface AccessibilityBadgesProps {
    isWheelchairAccessible?: boolean;
    isElderlyFriendly?: boolean;
    crowdLevel?: number; // 1-5
}

export default function AccessibilityBadges({
    isWheelchairAccessible,
    isElderlyFriendly,
    crowdLevel,
}: AccessibilityBadgesProps) {
    const getCrowdLabel = (level: number) => {
        if (level <= 2) return { label: 'Quiet', color: 'bg-green-100 text-green-700' };
        if (level === 3) return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-700' };
        return { label: 'Busy', color: 'bg-red-100 text-red-700' };
    };

    const crowdInfo = crowdLevel ? getCrowdLabel(crowdLevel) : null;

    return (
        <div className="flex flex-wrap gap-2 items-center">
            {isWheelchairAccessible && (
                <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><path d="M16 12H8" /><path d="M12 8v4l3 3" />
                    </svg>
                    Wheelchair Friendly
                </span>
            )}

            {isElderlyFriendly && (
                <span className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-100">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    Elderly Friendly
                </span>
            )}

            {crowdInfo && (
                <span className={`flex items-center gap-1.5 ${crowdInfo.color} px-3 py-1 rounded-full text-xs font-semibold border border-current opacity-80`}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {crowdInfo.label}
                </span>
            )}
        </div>
    );
}
