import React, { useState } from 'react';
import EnquiryModal from './EnquiryModal';

interface BookingCTAProps {
    title: string;
    type?: 'experience' | 'stay' | 'tour';
}

export default function BookingCTA({ title, type = 'experience' }: BookingCTAProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center my-12 backdrop-blur-sm">
                <h3 className="font-heading text-2xl font-bold text-primary mb-3">
                    Ready to live this story?
                </h3>
                <p className="text-neutral-slate mb-8 max-w-md mx-auto">
                    Our Studio Curators can help you arrange a private, high-end {type} based on this guide.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20 group"
                    >
                        <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Send Inquiry
                    </button>

                    <span className="text-neutral-slate text-sm font-medium">Or reach us at <a href="mailto:hello@indianstudiodmc.com" className="text-primary hover:underline">hello@indianstudiodmc.com</a></span>
                </div>
            </div>

            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
                type={type}
            />
        </>
    );
}
