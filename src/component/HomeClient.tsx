// main logic of homepage page.
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Feature {
    title: string;
    desc: string;
    icon: string;
    color: string;
}

function HomeClient({ email }: { email: string }) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const navigate = useRouter()

    const handlelogin = () => {
        setLoading(true)
        window.location.href = '/api/auth/login';
    }

    const firstLetter = email ? email[0].toUpperCase() : "";

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [])

    const features: Feature[] = [
        { title: "Plug & Play", desc: "Add the chatbot to your site with a single script tag.", icon: "⚡", color: "bg-amber-100 text-amber-600" },
        { title: "Admin Controlled", desc: "You control exactly what the AI knows and answers.", icon: "⚙️", color: "bg-violet-100 text-violet-600" },
        { title: "Always Online", desc: "Your customers get instant support 24/7.", icon: "🕒", color: "bg-emerald-100 text-emerald-600" }
    ]

    const handleLogout = async () => {
        try {
            await axios.get("/api/auth/logout");
            window.location.href = '/';
        } catch (error) {
            console.error("Logout Error:", error)
        }
    }

    // --- ANIMATION CONFIGURATION ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.18,
                delayChildren: 0.2
            }
        }
    }

    //  card animation 
    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 45,
                damping: 18,
                mass: 1.2,
            }
        }
    }

    return (
        <div className='min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100 font-sans overflow-x-hidden'>

            {/* Soft Background Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-100/30 to-transparent -z-10 blur-[120px]" />

            {/* Navbar */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60'
            >
                <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between'>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className='flex items-center gap-2.5 cursor-pointer'
                        onClick={() => navigate.push("/")}
                    >
                        <div className='w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200'>
                            <span className='text-white font-black text-xl'>B</span>
                        </div>
                        <span className='text-2xl font-bold tracking-tight text-slate-900'>
                            Bolt<span className='text-indigo-600'>Sync</span>
                        </span>
                    </motion.div>

                    {email ? (
                        <div className='relative' ref={popupRef}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className='w-11 h-11 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold shadow-xl border-2 border-white'
                                onClick={() => setOpen(!open)}
                            >
                                {firstLetter}
                            </motion.button>
                            <AnimatePresence>
                                {open && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                                        className='absolute right-0 mt-4 w-52 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden p-1.5 z-50'
                                    >
                                        <button
                                            className='w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition'
                                            onClick={() => navigate.push("/dashboard")}
                                        >
                                            📊 Dashboard
                                        </button>
                                        <button
                                            className='w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition'
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='px-7 py-3 rounded-2xl border-2 border-indigo-600 text-indigo-600 bg-transparent text-sm font-bold hover:bg-indigo-50 transition-colors'
                            onClick={handlelogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className='flex items-center gap-2'>
                                    <svg className='animate-spin w-4 h-4' viewBox='0 0 24 24' fill='none'>
                                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'/>
                                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z'/>
                                    </svg>
                                    Loading...
                                </span>
                            ) : "Login"}
                        </motion.button>
                    )}
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className='pt-50 pb-24 px-6'>
                <div className='max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center'>
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black mb-8 uppercase tracking-[0.2em]'>
                            🚀 AI Integration Platform
                        </div>
                        <h1 className='text-6xl lg:text-7xl font-black text-slate-900 leading-[1.15] tracking-tight mb-8'>
                            Instant Support. <br /> <span className='text-indigo-600'>Unlimited Growth.</span>
                        </h1>
                        <p className='text-xl text-slate-500 max-w-lg leading-relaxed mb-10 font-medium'>
                            Build and deploy hyper-intelligent AI agents that perfectly mirror your business brand and logic.
                        </p>
                        <div className='flex items-center gap-4 flex-wrap'>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={email ? () => navigate.push("/dashboard") : handlelogin}
                                className='px-10 py-5 rounded-[24px] bg-slate-950 text-white font-bold shadow-[0_20px_40px_rgba(0,0,0,0.2)] text-lg'
                            >
                                {email ? "Go to Dashboard" : "Get Started"}
                            </motion.button>

                            <motion.a
                                href="#feature"
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                className='px-10 py-5 rounded-[24px] bg-white text-slate-800 font-bold border-2 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 shadow-md text-lg transition-colors'
                            >
                                Learn More
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right Side Mockup UI */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='relative'
                    >
                        <div className='bg-white rounded-[48px] p-10 shadow-[0_30px_70px_rgba(99,102,241,0.1),0_10px_30px_rgba(0,0,0,0.06)] border border-slate-100 relative z-10'>
                            {/* Window dots */}
                            <div className='flex gap-2 mb-8'>
                                <div className='w-3 h-3 rounded-full bg-red-300' />
                                <div className='w-3 h-3 rounded-full bg-yellow-300' />
                                <div className='w-3 h-3 rounded-full bg-green-300' />
                            </div>

                            <div className='space-y-4'>
                                {/* User message */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className='bg-indigo-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm w-fit ml-auto text-sm font-semibold shadow-md shadow-indigo-200'
                                >
                                    How does BoltSync work?
                                </motion.div>

                                {/* Bot reply */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.1 }}
                                    className='bg-slate-50 text-slate-700 px-5 py-3 rounded-2xl rounded-tl-sm w-fit text-sm font-semibold border border-slate-100 shadow-sm'
                                >
                                    I sync with your docs instantly! 🚀
                                </motion.div>

                                {/* Typing dots */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.6 }}
                                    className='bg-slate-50 px-5 py-3.5 rounded-2xl rounded-tl-sm w-fit border border-slate-100 shadow-sm flex gap-1.5 items-center'
                                >
                                    {[0, 0.15, 0.3].map((d, i) => (
                                        <motion.span
                                            key={i}
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: d, ease: "easeInOut" }}
                                            className='w-2 h-2 rounded-full bg-slate-400 block'
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* Floating chat button */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                            className='absolute -bottom-6 -right-4 w-16 h-16 rounded-full bg-black flex items-center justify-center shadow-2xl border-[4px] border-white z-20'
                        >
                            <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.157-.878l-2.433.454.454-2.433A7.944 7.944 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                                <circle cx="8" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="16" cy="12" r="1.5" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id='feature' className='py-36 px-6 bg-white'>
                <div className='max-w-7xl mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className='text-center mb-24'
                    >
                        <h2 className='text-4xl md:text-6xl font-black text-slate-900 mb-6'>Built for Modern SaaS</h2>
                        <p className='text-slate-500 text-xl font-medium'>Experience support automation like never before.</p>
                    </motion.div>

                    {/* Smooth stagger animation on cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.15 }}
                        className='grid md:grid-cols-3 gap-10'
                    >
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                variants={cardVariants}
                                whileHover={{
                                    y: -12,
                                    scale: 1.02,
                                    transition: { type: "spring", stiffness: 300, damping: 20 }
                                }}
                                className='p-10 rounded-[44px] bg-[#F8FAFC] border border-slate-100 hover:shadow-2xl hover:shadow-indigo-100 transition-shadow group'>
                                <div className={`w-16 h-16 ${f.color} rounded-[22px] flex items-center justify-center text-3xl mb-8 group-hover:rotate-6 transition-transform duration-300 shadow-sm`}>
                                    {f.icon}
                                </div>
                                <h3 className='text-2xl font-bold text-slate-900 mb-4'>{f.title}</h3>
                                <p className='text-slate-600 leading-relaxed font-medium'>{f.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* logo + copyright centered, stacked vertically */}
            <footer className='py-20 bg-slate-950 text-white'>
                <div className='max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-4 text-center'>
                    <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-sm'>B</div>
                        <span className='text-2xl font-black tracking-tighter'>BoltSync</span>
                    </div>
                    <p className='text-slate-400 text-sm font-medium'>
                        &copy; {new Date().getFullYear()} BoltSync. Redefining support.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default HomeClient;