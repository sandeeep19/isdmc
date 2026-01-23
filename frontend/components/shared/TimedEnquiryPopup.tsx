'use client';

import React, { useState, useEffect } from 'react';
import EnquiryModal from './EnquiryModal';

export default function TimedEnquiryPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if the popup has already been shown in this session
        const hasBeenShown = sessionStorage.getItem('hasShownTimedInquiry');

        if (!hasBeenShown) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                // Mark as shown so it doesn't reappear in the same session
                sessionStorage.setItem('hasShownTimedInquiry', 'true');
            }, 10000); // 10 second delay

            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <EnquiryModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Planning Your Kashi Journey?"
            type="trip"
        />
    );
}
