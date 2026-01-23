'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    type?: string;
}

export default function EnquiryModal({ isOpen, onClose, title, type = 'experience' }: EnquiryModalProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
        }, 600);
    };

    const whatsappMessage = encodeURIComponent(`Hi Indian Studio DMC! I'm interested in the ${type}: "${title}". My name is ${formData.name}.`);
    const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}`;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-neutral-ink/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-neutral-slate hover:text-primary transition-colors z-10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-8">
                            {!isSubmitted ? (
                                <>
                                    <div className="mb-8">
                                        <span className="text-accent font-bold tracking-widest text-xs uppercase mb-2 block">Inquiry</span>
                                        <h2 className="text-3xl font-heading font-black text-primary leading-tight">
                                            Curate Your <span className="text-accent">Journey</span>
                                        </h2>
                                        <p className="text-neutral-slate mt-2">
                                            Interested in <span className="font-semibold text-primary">{title}</span>? Let&apos;s connect.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:border-primary/20 focus:bg-white outline-none transition-all"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="email"
                                                placeholder="Email Address"
                                                className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:border-primary/20 focus:bg-white outline-none transition-all"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                required
                                                rows={3}
                                                placeholder="Tell us a bit about your interests..."
                                                className="w-full px-4 py-3 bg-secondary/30 border border-transparent rounded-xl focus:border-primary/20 focus:bg-white outline-none transition-all resize-none"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20"
                                        >
                                            Send Message
                                        </button>

                                        <div className="relative py-2 text-center">
                                            <span className="bg-white px-4 relative z-10 text-xs text-neutral-slate uppercase tracking-widest font-bold">Or Connect Directly</span>
                                            <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-slate/10"></div>
                                        </div>

                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-green-500/10"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.3.149-1.777.877-2.074.981-.297.106-.514.158-.732.482-.218.324-.842 1.058-1.032 1.275-.19.218-.381.243-.68.094-.298-.148-1.26-.465-2.398-1.48-1.002-1.002-1.678-2.24-1.876-2.538-.198-.298-.021-.46.128-.607.135-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.732-1.766-.994-2.404-.256-.622-.52-.538-.716-.547-.183-.008-.396-.01-.608-.01-.212 0-.558.08-.85.397-.291.317-1.114 1.09-1.114 2.657 0 1.566 1.14 3.08 1.3 3.294.157.213 2.24 3.42 5.424 4.793.757.327 1.348.52 1.81.666.76.241 1.45.207 1.996.126.61-.09 1.777-.726 2.027-1.426.25-.7 0-1.294-.075-1.426-.075-.133-.277-.213-.578-.363zM12.193 2.016C6.678 2.016 2.22 6.474 2.22 11.989c0 1.762.459 3.479 1.332 5.002L2.016 22l5.122-1.344a9.917 9.917 0 004.996 1.332c5.513 0 9.972-4.458 9.972-9.974 0-2.671-1.04-5.182-2.926-7.07a9.925 9.925 0 00-6.987-2.927z" />
                                            </svg>
                                            Instant WhatsApp Reply
                                        </a>
                                    </form>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
                                    <p className="text-neutral-slate">
                                        Our Curators will review your request and reach out within 24 hours.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="mt-8 text-primary font-bold hover:underline"
                                    >
                                        Close Modal
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
