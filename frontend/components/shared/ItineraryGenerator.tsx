'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateItineraryPDF } from '@/lib/pdfGenerator';

const CATEGORIES = [
    { id: 'ghat', label: 'Ghats & Rituals', icon: '🛶' },
    { id: 'food', label: 'Local Flavors', icon: '🍲' },
    { id: 'shop', label: 'Artisans & Shops', icon: '🧵' },
    { id: 'gems', label: 'Hidden Gems', icon: '💎' },
];

const TIMES = [
    { id: 'day', label: 'Daylight Discovery', icon: '☀️' },
    { id: 'night', label: 'Night Mystique', icon: '🌙' },
];

export default function ItineraryGenerator() {
    const [selectedCats, setSelectedCats] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDays, setSelectedDays] = useState<number>(3);
    const [step, setStep] = useState(1);

    const toggleCategory = (id: string) => {
        setSelectedCats(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const currentSelectionSummary = () => {
        const cats = selectedCats.map(c => CATEGORIES.find(cat => cat.id === c)?.label).join(', ');
        const time = TIMES.find(t => t.id === selectedTime)?.label;
        return `${cats}${time ? ` during ${time}` : ''} for ${selectedDays} days`;
    };

    const whatsappMessage = encodeURIComponent(
        `Hi Indian Studio DMC! I've curated my interest path: ${currentSelectionSummary()}. Can you send me a custom PDF itinerary for this?`
    );
    const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}`;

    return (
        <div className="max-w-4xl mx-auto bg-white border border-primary/5 rounded-[2.5rem] shadow-2xl overflow-hidden shadow-primary/5">
            <div className="flex">
                {/* Progress Sidebar */}
                <div className="hidden md:flex flex-col w-64 bg-primary p-10 text-white/40">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="mb-8 flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step >= s ? 'border-accent text-accent' : 'border-white/20'}`}>
                                {step > s ? '✓' : s}
                            </div>
                            <span className={`font-bold text-sm uppercase tracking-widest ${step === s ? 'text-white' : ''}`}>
                                {s === 1 ? 'Focus' : s === 2 ? 'Timing' : s === 3 ? 'Duration' : 'Request'}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-grow p-8 md:p-12">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <header className="mb-10">
                                    <h2 className="text-3xl font-heading font-black text-primary mb-2">What calls to you?</h2>
                                    <p className="text-neutral-slate">Select the experiences you want to include in your path.</p>
                                </header>

                                <div className="grid grid-cols-2 gap-4">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => toggleCategory(cat.id)}
                                            className={`p-6 rounded-2xl border-2 transition-all text-left flex flex-col gap-3 group ${selectedCats.includes(cat.id)
                                                ? 'border-accent bg-accent/5'
                                                : 'border-primary/5 bg-secondary/20 hover:border-primary/20'
                                                }`}
                                        >
                                            <span className="text-3xl group-hover:scale-110 transition-transform block">{cat.icon}</span>
                                            <span className={`font-bold ${selectedCats.includes(cat.id) ? 'text-primary' : 'text-neutral-ink'}`}>
                                                {cat.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-12 flex justify-end">
                                    <button
                                        disabled={selectedCats.length === 0}
                                        onClick={() => setStep(2)}
                                        className="bg-primary text-white px-10 py-4 rounded-xl font-bold disabled:opacity-30 disabled:scale-100 hover:scale-105 transition-all shadow-xl shadow-primary/20"
                                    >
                                        Next: Set Timing
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <header className="mb-10">
                                    <h2 className="text-3xl font-heading font-black text-primary mb-2">When do we go?</h2>
                                    <p className="text-neutral-slate">Choose your preferred vibe for this journey.</p>
                                </header>

                                <div className="grid grid-cols-2 gap-4">
                                    {TIMES.map((time) => (
                                        <button
                                            key={time.id}
                                            onClick={() => setSelectedTime(time.id)}
                                            className={`p-6 rounded-2xl border-2 transition-all text-left flex flex-col gap-3 group ${selectedTime === time.id
                                                ? 'border-accent bg-accent/5'
                                                : 'border-primary/5 bg-secondary/20 hover:border-primary/20'
                                                }`}
                                        >
                                            <span className="text-3xl group-hover:scale-110 transition-transform block">{time.icon}</span>
                                            <span className={`font-bold ${selectedTime === time.id ? 'text-primary' : 'text-neutral-ink'}`}>
                                                {time.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-12 flex justify-between items-center">
                                    <button onClick={() => setStep(1)} className="text-neutral-slate font-bold hover:text-primary">Back</button>
                                    <button
                                        disabled={!selectedTime}
                                        onClick={() => setStep(3)}
                                        className="bg-primary text-white px-10 py-4 rounded-xl font-bold disabled:opacity-30 disabled:scale-100 hover:scale-105 transition-all shadow-xl shadow-primary/20"
                                    >
                                        Next: Trip Duration
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <header className="mb-10">
                                    <h2 className="text-3xl font-heading font-black text-primary mb-2">How many days?</h2>
                                    <p className="text-neutral-slate">Tell us the duration of your Kashi immersive.</p>
                                </header>

                                <div className="flex flex-col items-center gap-8 py-8">
                                    <div className="text-6xl font-black text-accent">{selectedDays} Days</div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={selectedDays}
                                        onChange={(e) => setSelectedDays(parseInt(e.target.value))}
                                        className="w-full h-3 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between w-full text-xs font-bold text-neutral-slate px-2">
                                        <span>1 DAY</span>
                                        <span>5 DAYS</span>
                                        <span>10 DAYS</span>
                                    </div>
                                </div>

                                <div className="mt-12 flex justify-between items-center">
                                    <button onClick={() => setStep(2)} className="text-neutral-slate font-bold hover:text-primary">Back</button>
                                    <button
                                        onClick={() => setStep(4)}
                                        className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20"
                                    >
                                        Generate Itinerary
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-8">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                                <h2 className="text-4xl font-heading font-black text-primary mb-4">Itinerary Ready</h2>
                                <p className="text-neutral-slate mb-10 max-w-sm mx-auto leading-relaxed">
                                    We've curated a custom **{selectedDays}-day path** featuring **{selectedCats.length} focuses** for the **{selectedTime === 'day' ? 'day' : 'night'}**.
                                </p>

                                <div className="bg-secondary/20 p-6 rounded-2xl mb-10 border border-primary/5 text-left max-w-md mx-auto">
                                    <h4 className="text-xs uppercase tracking-widest font-bold text-accent mb-3">Selections</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCats.map(c => (
                                            <span key={c} className="bg-white px-3 py-1 rounded-full text-sm font-bold border border-primary/5">
                                                {CATEGORIES.find(cat => cat.id === c)?.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 max-w-md mx-auto">
                                    <button
                                        onClick={() => generateItineraryPDF({
                                            categories: selectedCats,
                                            time: selectedTime || 'day',
                                            days: selectedDays
                                        })}
                                        className="flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Download PDF Now
                                    </button>

                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl shadow-green-500/10"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.3.149-1.777.877-2.074.981-.297.106-.514.158-.732.482-.218.324-.842 1.058-1.032 1.275-.19.218-.381.243-.68.094-.298-.148-1.26-.465-2.398-1.48-1.002-1.002-1.678-2.24-1.876-2.538-.198-.298-.021-.46.128-.607.135-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.732-1.766-.994-2.404-.256-.622-.52-.538-.716-.547-.183-.008-.396-.01-.608-.01-.212 0-.558.08-.85.397-.291.317-1.114 1.09-1.114 2.657 0 1.566 1.14 3.08 1.3 3.294.157.213 2.24 3.42 5.424 4.793.757.327 1.348.52 1.81.666.76.241 1.45.207 1.996.126.61-.09 1.777-.726 2.027-1.426.25-.7 0-1.294-.075-1.426-.075-.133-.277-.213-.578-.363zM12.193 2.016C6.678 2.016 2.22 6.474 2.22 11.989c0 1.762.459 3.479 1.332 5.002L2.016 22l5.122-1.344a9.917 9.917 0 004.996 1.332c5.513 0 9.972-4.458 9.972-9.974 0-2.671-1.04-5.182-2.926-7.07a9.925 9.925 0 00-6.987-2.927z" />
                                        </svg>
                                        Send PDF to WhatsApp
                                    </a>
                                    <button onClick={() => setStep(1)} className="text-neutral-slate font-bold hover:text-primary py-2 transition-colors">
                                        Start Over
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
